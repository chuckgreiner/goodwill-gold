import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Tag, DollarSign, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-heading font-bold text-xl text-foreground">
            Market Insights
          </h1>
          <Link href="/dashboard">
            <button className="text-sm text-muted-foreground hover:text-foreground flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container py-10 space-y-10">
        {/* Trending Brands */}
        <section>
          <h2 className="font-heading font-semibold text-2xl mb-4 text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Trending Brands
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { brand: "Lululemon", change: "+18%", category: "Activewear" },
              { brand: "Kate Spade", change: "+11%", category: "Bags & Accessories" },
              { brand: "Free People", change: "+9%", category: "Women's Fashion" },
            ].map((b, i) => (
              <Card key={i} className="border-2 hover:border-primary/40 transition">
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-heading font-semibold text-xl">{b.brand}</h3>
                  <p className="text-muted-foreground text-sm">{b.category}</p>
                  <p className="text-primary font-bold text-lg">{b.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Categories */}
        <section>
          <h2 className="font-heading font-semibold text-2xl mb-4 text-foreground flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Best Categories to Resell
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Athleisure", avg: "$42" },
              { label: "Designer Bags", avg: "$138" },
              { label: "Vintage Jackets", avg: "$85" },
            ].map((c, i) => (
              <Card key={i} className="border-2 border-muted/30">
                <CardContent className="p-6 text-center">
                  <div className="font-heading text-xl text-foreground mb-1">{c.label}</div>
                  <p className="text-primary font-bold text-lg">{c.avg} Avg Sale</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Resale Value Trends */}
        <section>
          <h2 className="font-heading font-semibold text-2xl mb-4 text-foreground flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-chart-3" />
            Value Trends
          </h2>
          <Card className="border-2">
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Resale value across major platforms is trending up for premium athletic wear,
                structured handbags, and limited-edition vintage jackets.
              </p>
              <p className="text-foreground font-medium">
                <Sparkles className="h-4 w-4 inline-block mr-1 text-accent" />
                Recent scanning shows a 12% increase in average resale pricing for popular brands.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
