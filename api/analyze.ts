import type { VercelRequest, VercelResponse } from "@vercel/node";
import Replicate from "replicate";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "Missing image" });
    }

    // Create Replicate client
    const replicate = new Replicate({
      auth: process.env.VITE_REPLICATE_API_TOKEN!,
    });

    // DIRECTLY FEED BASE64 INTO THE MODEL (works with your SDK)
    const result = await replicate.run(
      "fofr/clip-interrogator:latest",
      {
        input: {
          image: imageBase64,   // <-- Your SDK supports data URLs
          mode: "fast"
        }
      }
    );

    return res.status(200).json({
      success: true,
      result,
    });

  } catch (err: any) {
    console.error("Analyze error:", err);
    return res.status(500).json({
      error: "Failed to analyze image",
      details: err?.message || err,
    });
  }
}
