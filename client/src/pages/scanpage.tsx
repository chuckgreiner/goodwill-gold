import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Upload, Loader2, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function ScanPage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleScan = () => {
    if (!image) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult("Gucci Denim Jacket — Estimated resale: $180–$240");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Goodwill Gold" className="h-10 w-10" />
            <span className="font-heading font-bold text-xl text-foreground">
              Goodwill Gold
            </span>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16">
        <div className="container max-w-lg mx-auto text-center space-y-8">
          <h1 className="font-heading font-bold text-3xl text-foreground">
            Start a Scan
          </h1>
          <p className="text-muted-foreground">
            Upload or take a picture of a thrift item, and let AI estimate its value.
          </p>

          <Card className="p-8">
            <CardContent className="space-y-6">
              {!image ? (
                <>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer border-2 border-dashed border-muted rounded-xl p-8 flex flex-col items-center justify-center hover:border-primary/50 transition"
                  >
                    <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop an image
                    </p>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </>
              ) : (
                <div className="space-y-4">
                  <img
                    src={image}
                    alt="Uploaded item"
                    className="rounded-xl mx-auto max-h-64 object-contain"
                  />
                  <Button
                    onClick={handleScan}
                    disabled={loading}
                    className="w-full font-semibold"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        Scanning...
                      </>
                    ) : (
                      "Scan Item"
                    )}
                  </Button>
                </div>
              )}

              {result && (
                <div className="p-4 bg-accent/10 rounded-lg text-accent text-sm flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  {result}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2025 Goodwill Gold. All rights reserved.</p>
      </footer>
    </div>
  );
}
