// api/analyze.ts
// Simple mock analyzer: always returns a realistic-looking scan result.
// For now we ignore the actual uploaded image – this keeps everything reliable.
// Later we can plug Replicate into this same file.

type TrendStatus = "hot" | "steady" | "rare";

interface ScanResult {
  brand: string;
  category: string;
  valueMin: number;
  valueMax: number;
  condition: string;
  trendStatus: TrendStatus;
  confidence: number;
}

const MOCK_RESULTS: ScanResult[] = [
  {
    brand: "Lululemon",
    category: "Align Leggings",
    valueMin: 45,
    valueMax: 75,
    condition: "Excellent",
    trendStatus: "hot",
    confidence: 96,
  },
  {
    brand: "Madewell",
    category: "High-Rise Skinny Jeans",
    valueMin: 32,
    valueMax: 58,
    condition: "Good",
    trendStatus: "steady",
    confidence: 92,
  },
  {
    brand: "Patagonia",
    category: "Synchilla Snap-T Fleece",
    valueMin: 65,
    valueMax: 110,
    condition: "Excellent",
    trendStatus: "hot",
    confidence: 94,
  },
  {
    brand: "Free People",
    category: "Boho Maxi Dress",
    valueMin: 40,
    valueMax: 72,
    condition: "Good",
    trendStatus: "steady",
    confidence: 89,
  },
  {
    brand: "Vintage Nike",
    category: "Windbreaker Jacket",
    valueMin: 55,
    valueMax: 105,
    condition: "Excellent",
    trendStatus: "rare",
    confidence: 90,
  },
];

function getRandomResult(): ScanResult {
  const idx = Math.floor(Math.random() * MOCK_RESULTS.length);
  return MOCK_RESULTS[idx];
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    // We *could* parse the multipart form here, but for now we just simulate latency.
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = getRandomResult();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
  } catch (error) {
    console.error("Error in /api/analyze:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Failed to analyze image" }));
  }
}
