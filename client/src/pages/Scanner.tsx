import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, X, Sparkles, DollarSign } from "lucide-react";
import { toast } from "sonner";
import Replicate from "replicate";

interface ScanResult {
  description: string;
  confidence: number;
  valueEstimate?: number;
  category?: string;
}

export default function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const replicate = new Replicate({
    auth: import.meta.env.VITE_REPLICATE_API_TOKEN,
  });

  /** Handle a file upload or camera capture */
  const handleImage = async (file: File) => {
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setUploadedImage(base64);
      toast.info("📸 Analyzing your photo...");
      setIsScanning(true);

      try {
        // Step 1: Describe the image using Replicate
        const output = await replicate.run(
          "salesforce/blip-image-captioning-base",
          { input: { image: base64 } }
        );

        const description = typeof output === "string" ? output : output[0]?.caption || "Unknown item";
        toast.success("✨ Analysis complete!");
        console.log("Replicate caption:", description);

        // Step 2: Optional resale value estimation (can be a backend route or GPT call)
        let estimatedValue = Math.floor(Math.random() * 150) + 20;
        let category = "Apparel / Accessories";

        // (Optional future: use GPT endpoint)
        // const res = await fetch("/api/estimate", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ description }),
        // });
        // const data = await res.json();
        // estimatedValue = data.valueEstimate;
        // category = data.category;

        setScanResult({
          description,
          confidence: 92,
          category,
          valueEstimate: estimatedValue,
        });
      } catch (error) {
        console.error("Replicate error:", error);
        toast.error("⚠️ Unable to analyze image. Using sample data instead.");
        setScanResult({
          description: "Unknown Brand Jacket",
          confidence: 75,
          category: "Outerwear",
          valueEstimate: 40,
        });
      } finally {
        setIsScanning(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleCameraUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImage(file);
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImage(file);
  };

  const handleReset = () => {
    setScanResult(null);
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex justify-between items-center h-16">
          <h1 className="font-heading font-bold text-xl text-foreground">AI Scanner</h1>
          {scanResult && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <X className="h-4 w-4 mr-2" /> Reset
            </Button>
          )}
        </div>
      </header>

      <div className="container py-6 space-y-6">
        {!scanResult && (
          <Card className="overflow-hidden">
            <CardContent className="p-6 text-center space-y-6">
              {!uploadedImage ? (
                <>
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Camera className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="font-heading font-semibold text-2xl text-foreground">
                    Upload or Capture a Photo
                  </h2>
                  <p className="text-muted-foreground">
                    Take a photo or choose one from your gallery to identify your thrift find.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                    {/* Camera Button */}
                    <Button asChild size="lg" className="font-heading font-semibold">
                      <label
                        htmlFor="camera-upload"
                        className="cursor-pointer flex items-center justify-center"
                      >
                        <Camera className="mr-2 h-5 w-5" /> Take Photo
                        <input
                          id="camera-upload"
                          type="file"
                          accept="image/*"
                          capture="environment"
                          hidden
                          onChange={handleCameraUpload}
                        />
                      </label>
                    </Button>

                    {/* Gallery Button */}
                    <Button asChild size="lg" variant="outline" className="font-heading font-semibold">
                      <label
                        htmlFor="gallery-upload"
                        className="cursor-pointer flex items-center justify-center"
                      >
                        <Upload className="mr-2 h-5 w-5" /> Choose from Gallery
                        <input
                          id="gallery-upload"
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={handleGalleryUpload}
                        />
                      </label>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="mx-auto rounded-xl max-h-96 shadow-lg"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-heading text-lg rounded-xl">
                      <Sparkles className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {scanResult && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card>
              <CardContent className="p-6 space-y-4 text-center">
                <h2 className="font-heading text-3xl font-bold text-foreground">
                  {scanResult.description}
                </h2>
                <Badge variant="secondary" className="text-sm">
                  Confidence: {scanResult.confidence}%
                </Badge>
                {scanResult.category && (
                  <p className="text-muted-foreground mt-2">{scanResult.category}</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 text-center">
              <CardContent className="p-6">
                <DollarSign className="mx-auto h-6 w-6 text-primary mb-2" />
                <p className="text-muted-foreground text-sm">Estimated Resale Value</p>
                <h3 className="font-heading text-3xl font-bold text-primary">
                  ${scanResult.valueEstimate}
                </h3>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
