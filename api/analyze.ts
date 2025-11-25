// api/analyze.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { FormData, File } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const replicateToken = process.env.VITE_REPLICATE_API_TOKEN;
  if (!replicateToken) {
    return res.status(500).json({ error: "Missing Replicate token" });
  }

  try {
    // ---- Read binary upload from request ----
    const buffers: Uint8Array[] = [];
    for await (const chunk of req) buffers.push(chunk);
    const rawBody = Buffer.concat(buffers);

    // Determine file type
    const type = await fileTypeFromBuffer(rawBody);
    if (!type) return res.status(400).json({ error: "Invalid image upload" });

    const imageFile = new File([rawBody], `upload.${type.ext}`, {
      type: type.mime,
    });

    // ---- Upload file to Replicate ----
    const uploadForm = new FormData();
    uploadForm.set("file", imageFile);

    const uploadRes = await fetch("https://api.replicate.com/v1/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${replicateToken}`,
      },
      body: uploadForm,
    });

    const uploaded = await uploadRes.json();
    if (!uploaded?.url) {
      console.error("Upload failed:", uploaded);
      return res.status(500).json({ error: "Image upload failed" });
    }

    const imageUrl = uploaded.url;

    // ---- Build Vision Prompt ----
    const prompt = `
You are an expert reseller and authentication specialist.
Analyze the object in this image:

${imageUrl}

Return ONLY a JSON object with the following fields:
{
  "brand": "Brand Name",
  "category": "Category of item",
  "min": 50,
  "max": 120
}
Prices should reflect realistic SECOND-HAND resale value on eBay/Poshmark/Depop.
    `;

    // ---- Start Vision Model Prediction ----
    const predictionRes = await fetch(
      "https://api.replicate.com/v1/models/meta/meta-llama-3.2-vision-instruct/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${replicateToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            prompt,
            image: imageUrl,
          },
        }),
      }
    );

    const prediction = await predictionRes.json();

    if (!prediction?.urls?.get) {
      console.error("Prediction error:", prediction);
      return res.status(500).json({ error: "Model request failed" });
    }

    // ---- Poll until the model finishes ----
    let result = prediction;
    while (result.status === "starting" || result.status === "processing") {
      await new Promise((r) => setTimeout(r, 1000));
      const poll = await fetch(result.urls.get, {
        headers: { Authorization: `Bearer ${replicateToken}` },
      });
      result = await poll.json();
    }

    if (!result.output) {
      console.error("No output:", result);
      return res.status(500).json({ error: "Model returned no output" });
    }

    // ---- Convert output to JSON ----
    const rawText =
      Array.isArray(result.output) ? result.output.join(" ") : String(result.output);

    let parsed;
    try {
      parsed = JSON.parse(rawText.replace(/```json|```/g, "").trim());
    } catch (err) {
      console.error("JSON parse failed:", rawText);
      return res.status(500).json({ error: "Model output unreadable" });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Analyze API error:", err);
    return res.status(500).json({ error: "Server error analyzing image" });
  }
}
