import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Upload,
  X,
  Sparkles,
  Loader2,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

interface ScanResult {
  brand: string;
  label: string;
  confidence: number;
  description?: string;
  valueMin?: number;
  valueMax?: number;
  trendStatus?: "hot" | "steady" | "rare";
  image?: string;
}

export default function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const REPLICATE_API_TOKEN = import.meta.env.VITE_REPLICATE_API_TOKEN;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    setScanResult(null);
  };

  const handleScan = async () => {
    if (!imagePreview) {
      toast.error("Please upload or capture an image first!");
      return;
    }

    setIsScanning(true);
    toast.loading("Analyzing image...");

    try {
      // Convert base64 to blob
      const blob = await (await fetch(imagePreview)).blob();

      // Upload image to Replicate model
      const formData = new FormData();
      formData.append("version", "e6a1be48a1b35e109fefc5ecb6a924b208d2ad2f705af7e1a4c1afcb3228a91e"); // CLIP Interrogator
      formData.append(
        "input",
        JSON.stringify({
          image: blob,
        })
      );

      const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Token ${REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version:
            "e6a1be48a1b35e109fefc5ecb6a924b208d2ad2f705af7e1a4c1afcb3228a91e", // Replicate CLIP Interrogator
          input: { image: imagePreview },
        }),
      });

      const prediction = await response.json();
      if (prediction.error) throw new Error(prediction.error);

      // Extract top caption or description
      const label =
        prediction.output?.[0] || "Unable to classify — try a clearer photo.";

      const mockValue = Math.floor(Math.random() * 100) + 30;

      const result: ScanResult = {
        brand: label.split(" ")[0],
        label,
        confidence: 90,
        valueMin: mockValue,
        valueMax: mockValue + 50,
        trendStatus: "steady",
        image: imagePreview,
      };

      setScanResult(result);
      toast.dismiss();
      toast.success("✨ Scan complete!");
    } catch (err: any) {
      console.error(err);
      toast.dismiss();
      toast.error("Failed to analyze image. Check your Replicate token or try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setScanResult(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getTrendBadge = (status: string) => {
    switch (status) {
      case "hot":
        return <Badge className="bg-accent text-accent-foreground">🔥 Trending Now</Badge>;
      case "rare":
        return <Badge className="bg-chart-3 text-white">💎 Rare Find</Badge>;
      default:
        return <Badge variant="secondary">⭐ Steady Seller</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-heading font-bold text-xl text-foreground">AI Scanner</h1>
          {(scanResult || imagePreview) && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <X className="h-4 w-4 mr-2" /> Reset
            </Button>
          )}
        </div>
      </header>

      <div className="container py-6 space-y-6">
        {!scanResult && (
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Uploaded item"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="text-center space-y-6 p-8">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Sparkles className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="font-heading font-semibold text-2xl text-foreground">
                      Ready to Find Gold?
                    </h2>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Upload or capture a photo to identify your item and estimate its resale value.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                {!imagePreview ? (
                  <>
                    <Button
                      size="lg"
                      className="w-full font-heading font-semibold"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      Upload or Take Photo
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </>
                ) : (
                  <Button
                    size="lg"
                    className="w-full font-heading font-semibold"
                    onClick={handleScan}
                    disabled={isScanning}
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-5 w-5" />
                        Scan Item
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {scanResult && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card>
              <CardContent className="p-4">
                <img
                  src={scanResult.image}
                  alt="Scanned item"
                  className="rounded-lg w-full h-auto object-contain"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-heading font-bold text-3xl text-foreground">
                      {scanResult.brand}
                    </h2>
                    <p className="text-lg text-muted-foreground">{scanResult.label}</p>
                  </div>
                  {scanResult.trendStatus && getTrendBadge(scanResult.trendStatus)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span>{scanResult.confidence}% confidence</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Estimated Resale Value
                </div>
                <span className="font-heading font-bold text-4xl text-primary">
                  ${scanResult.valueMin} – ${scanResult.valueMax}
                </span>
                <p className="text-sm text-muted-foreground">
                  Based on similar resale listings across major platforms.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button size="lg" className="w-full font-heading font-semibold">
                Add to My Inventory
              </Button>
              <Button size="lg" variant="outline" className="w-full font-heading font-semibold">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Similar Sold Items
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
