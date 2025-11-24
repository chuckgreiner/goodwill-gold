import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, Sparkles, X, Tag, DollarSign, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function ScannerPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  // ---- Handle Camera ----
  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  // ---- Handle Upload ----
  const openUpload = () => {
    uploadInputRef.current?.click();
  };

  // ---- When a photo is selected ----
  const handleFileSelected = async (file: File) => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setIsAnalyzing(true);
    toast("Analyzing item...");

    // Send to API
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Scan failed");
        setIsAnalyzing(false);
        return;
      }

      setResult(data);
    } catch (err) {
      toast.error("Error scanning item");
    }

    setIsAnalyzing(false);
  };

  const reset = () => {
    setImagePreview(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hidden Inputs */}
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelected(e.target.files[0]);
          }
        }}
      />

      <input
        type="file"
        ref={uploadInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelected(e.target.files[0]);
          }
        }}
      />

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-heading font-bold text-xl text-foreground">AI Scanner</h1>
          {imagePreview && (
            <Button variant="ghost" size="sm" onClick={reset}>
              <X className="h-4 w-4 mr-2" /> Reset
            </Button>
          )}
        </div>
      </header>

      <div className="container py-6 space-y-6">
        {/* BEFORE SCAN */}
        {!imagePreview && !result && (
          <Card className="p-6 text-center space-y-6">
            <div className="h-20 w-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>

            <h2 className="text-2xl font-heading font-semibold">Ready to Find Gold?</h2>

            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={openCamera}>
                <Camera className="h-5 w-5 mr-2" />
                Take Photo
              </Button>

              <Button size="lg" variant="outline" className="w-full" onClick={openUpload}>
                <Upload className="h-5 w-5 mr-2" />
                Upload Photo
              </Button>
            </div>
          </Card>
        )}

        {/* IMAGE PREVIEW */}
        {imagePreview && !result && (
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img src={imagePreview} className="w-full object-cover" />

              <div className="p-6">
                <Button size="lg" className="w-full" disabled>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* RESULTS */}
        {result && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <img src={imagePreview!} className="rounded-xl w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3">
                <h2 className="text-3xl font-heading font-bold">{result.brand}</h2>
                <p className="text-muted-foreground">{result.category}</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 border-2">
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Estimated Resale Value
                </div>
                <div className="text-4xl font-heading font-bold text-primary">
                  ${result.min} - ${result.max}
                </div>
              </CardContent>
            </Card>

            <Button variant="outline" size="lg" className="w-full" onClick={reset}>
              Scan Another Item
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
