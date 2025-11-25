// client/src/pages/Scanner.tsx

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Upload,
  X,
  Sparkles,
  TrendingUp,
  DollarSign,
  Tag,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

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

type ScannerStatus = "idle" | "ready" | "analyzing" | "done" | "error";

export default function ScannerPage() {
  const [status, setStatus] = useState<ScannerStatus>("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const resetState = () => {
    setStatus("idle");
    setResult(null);
    setImagePreview(null);
    setErrorMessage(null);
  };

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    // Show preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setResult(null);
    setErrorMessage(null);
    setStatus("ready");

    // Kick off analysis automatically
    void analyzeImage(file);
  };

  const analyzeImage = async (file: File) => {
    try {
      setStatus("analyzing");
      setErrorMessage(null);

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch (e) {
        console.error("Failed to parse JSON from /api/analyze:", e);
      }

      if (!response.ok) {
        console.error("Analyze API error:", data);
        setStatus("error");
        setErrorMessage(
          data?.error || "Scan failed. Please try again with a different photo."
        );
        toast.error("Scan failed.");
        return;
      }

      // Normalize to ScanResult shape (in case we change API later)
      const normalized: ScanResult = {
        brand: data.brand ?? "Unknown Brand",
        category: data.category ?? "Unknown Item",
        valueMin:
          typeof data.valueMin === "number"
            ? data.valueMin
            : data.minPrice ?? 0,
        valueMax:
          typeof data.valueMax === "number"
            ? data.valueMax
            : data.maxPrice ?? 0,
        condition: data.condition ?? "Unknown",
        trendStatus: (data.trendStatus as TrendStatus) ?? "steady",
        confidence: data.confidence ?? 85,
      };

      setResult(normalized);
      setStatus("done");
      toast.success("✨ Found it! Here's what we know...");
    } catch (error) {
      console.error("Error calling /api/analyze:", error);
      setStatus("error");
      setErrorMessage(
        "Something went wrong talking to the scanner. Please try again."
      );
      toast.error("Scan failed. Please try again.");
    }
  };

  const getTrendBadge = (status: TrendStatus) => {
    switch (status) {
      case "hot":
        return (
          <Badge className="bg-accent text-accent-foreground">
            🔥 Trending Now
          </Badge>
        );
      case "rare":
        return <Badge className="bg-chart-3 text-white">💎 Rare Find</Badge>;
      default:
        return <Badge variant="secondary">⭐ Steady Seller</Badge>;
    }
  };

  const isAnalyzing = status === "analyzing";

  const showEmptyState = !imagePreview && !result && status !== "error";

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <h1 className="font-heading font-bold text-xl text-foreground">
              AI Scanner
            </h1>
            {status !== "idle" && (
              <Button variant="ghost" size="sm" onClick={resetState}>
                <X className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container py-6 space-y-6">
        {/* Scanner Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-[3/4] bg-muted relative flex items-center justify-center">
              {showEmptyState && (
                <div className="text-center space-y-6 p-8">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Sparkles className="h-10 w-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-heading font-semibold text-2xl text-foreground">
                      Ready to Find Gold?
                    </h2>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Take a photo or upload an item from your gallery to
                      identify the brand and estimate its resale value.
                    </p>
                  </div>
                </div>
              )}

              {/* Image preview */}
              {imagePreview && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Selected item"
                    className="h-full w-full object-cover"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 text-white">
                      <Sparkles className="h-8 w-8 animate-spin" />
                      <p className="font-medium">Analyzing your find...</p>
                    </div>
                  )}
                </div>
              )}

              {/* Error overlay */}
              {status === "error" && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 text-red-100 px-6 text-center">
                  <AlertCircle className="h-8 w-8 text-red-300" />
                  <p className="font-heading font-semibold text-lg">
                    Scan failed
                  </p>
                  <p className="text-sm max-w-sm">
                    {errorMessage ??
                      "Something went wrong while analyzing this photo."}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={resetState}
                      className="bg-white/10 border-white/40 text-white hover:bg-white/20"
                    >
                      Try a Different Photo
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-6 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  size="lg"
                  className="w-full font-heading font-semibold"
                  onClick={() => cameraInputRef.current?.click()}
                  disabled={isAnalyzing}
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Take Photo
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full font-heading font-semibold"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzing}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Photo
                </Button>
              </div>

              <p className="text-xs text-muted-foreground pt-1">
                We don&apos;t store your photos. Images are used only to
                generate this estimate.
              </p>
            </div>

            {/* Hidden file inputs */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileSelected}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelected}
            />
          </CardContent>
        </Card>

        {/* Results */}
        {result && status === "done" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Result image placeholder (optional) */}
            <Card>
              <CardContent className="p-4">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <Tag className="h-16 w-16 text-primary" />
                </div>
              </CardContent>
            </Card>

            {/* Brand & Category */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="font-heading font-bold text-3xl text-foreground">
                      {result.brand}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      {result.category}
                    </p>
                  </div>
                  {getTrendBadge(result.trendStatus)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span>{result.confidence}% confidence</span>
                </div>
              </CardContent>
            </Card>

            {/* Value Estimation */}
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Estimated Resale Value
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-bold text-4xl text-primary">
                    ${result.valueMin} – ${result.valueMax}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on recent sold listings across major resale platforms.
                </p>
              </CardContent>
            </Card>

            {/* Extra details */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Condition
                  </div>
                  <div className="font-heading font-semibold text-lg text-foreground">
                    {result.condition}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Avg. Sale Time
                  </div>
                  <div className="font-heading font-semibold text-lg text-foreground">
                    7–14 days
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button size="lg" className="w-full font-heading font-semibold">
                Add to My Inventory
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full font-heading font-semibold"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                View Similar Sold Items
              </Button>
            </div>

            {/* Tip */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">💡 Pro Tip:</span> Check the
                  item carefully for flaws or damage before buying. Condition
                  has a big impact on resale value.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
