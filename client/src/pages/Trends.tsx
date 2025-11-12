import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Flame, Sparkles } from "lucide-react";

interface TrendingItem {
  brand: string;
  category: string;
  avgPrice: number;
  soldCount: number;
  trend: "up" | "hot" | "new";
  platform: string;
}

const trendingItems: TrendingItem[] = [
  { brand: "Lululemon", category: "Align Leggings", avgPrice: 58, soldCount: 342, trend: "hot", platform: "Poshmark" },
  { brand: "Vintage Levi's", category: "501 Jeans", avgPrice: 45, soldCount: 289, trend: "hot", platform: "Depop" },
  { brand: "Patagonia", category: "Fleece Jacket", avgPrice: 75, soldCount: 234, trend: "up", platform: "eBay" },
  { brand: "Nike", category: "Air Jordan 1", avgPrice: 180, soldCount: 198, trend: "hot", platform: "eBay" },
  { brand: "Free People", category: "Boho Dress", avgPrice: 42, soldCount: 176, trend: "up", platform: "Poshmark" },
  { brand: "Carhartt", category: "Work Jacket", avgPrice: 68, soldCount: 165, trend: "new", platform: "Depop" },
  { brand: "Kate Spade", category: "Crossbody Bag", avgPrice: 95, soldCount: 152, trend: "up", platform: "Poshmark" },
  { brand: "Juicy Couture", category: "Tracksuit", avgPrice: 85, soldCount: 143, trend: "hot", platform: "Depop" },
  { brand: "Athleta", category: "Sports Bra", avgPrice: 32, soldCount: 138, trend: "up", platform: "Poshmark" },
  { brand: "Vintage Nike", category: "Windbreaker", avgPrice: 55, soldCount: 127, trend: "new", platform: "Depop" },
];

const y2kItems: TrendingItem[] = [
  { brand: "Juicy Couture", category: "Tracksuit", avgPrice: 85, soldCount: 143, trend: "hot", platform: "Depop" },
  { brand: "Von Dutch", category: "Trucker Hat", avgPrice: 38, soldCount: 92, trend: "hot", platform: "Depop" },
  { brand: "Baby Phat", category: "Logo Tee", avgPrice: 45, soldCount: 87, trend: "up", platform: "Depop" },
  { brand: "Ed Hardy", category: "Graphic Tee", avgPrice: 42, soldCount: 76, trend: "new", platform: "Depop" },
];

const designerItems: TrendingItem[] = [
  { brand: "Louis Vuitton", category: "Speedy Bag", avgPrice: 850, soldCount: 45, trend: "hot", platform: "Vestiaire" },
  { brand: "Gucci", category: "Belt", avgPrice: 320, soldCount: 38, trend: "up", platform: "TheRealReal" },
  { brand: "Burberry", category: "Trench Coat", avgPrice: 580, soldCount: 32, trend: "up", platform: "Poshmark" },
  { brand: "Coach", category: "Leather Bag", avgPrice: 145, soldCount: 89, trend: "hot", platform: "Poshmark" },
];

const sneakerItems: TrendingItem[] = [
  { brand: "Nike", category: "Air Jordan 1", avgPrice: 180, soldCount: 198, trend: "hot", platform: "eBay" },
  { brand: "Nike", category: "Dunk Low", avgPrice: 145, soldCount: 156, trend: "hot", platform: "eBay" },
  { brand: "Adidas", category: "Yeezy 350", avgPrice: 220, soldCount: 87, trend: "up", platform: "eBay" },
  { brand: "New Balance", category: "550", avgPrice: 95, soldCount: 134, trend: "new", platform: "eBay" },
];

function TrendingItemCard({ item }: { item: TrendingItem }) {
  const getTrendIcon = () => {
    switch (item.trend) {
      case "hot":
        return <Flame className="h-4 w-4 text-accent" />;
      case "new":
        return <Sparkles className="h-4 w-4 text-chart-3" />;
      default:
        return <TrendingUp className="h-4 w-4 text-primary" />;
    }
  };

  const getTrendBadge = () => {
    switch (item.trend) {
      case "hot":
        return <Badge className="bg-accent text-accent-foreground">🔥 Hot</Badge>;
      case "new":
        return <Badge className="bg-chart-3 text-white">✨ New</Badge>;
      default:
        return <Badge variant="secondary">📈 Rising</Badge>;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all hover:border-primary/50">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-heading font-semibold text-lg text-foreground">{item.brand}</h3>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>
          {getTrendBadge()}
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="font-heading font-bold text-2xl text-primary">${item.avgPrice}</span>
          <span className="text-sm text-muted-foreground">avg. sale</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            {getTrendIcon()}
            <span>{item.soldCount} sold this week</span>
          </div>
          <Badge variant="outline" className="text-xs">{item.platform}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Trends() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary/10 via-accent/5 to-chart-3/10 border-b border-border">
        <div className="container py-8 space-y-2">
          <h1 className="font-heading font-bold text-3xl text-foreground">What's Trending Now</h1>
          <p className="text-muted-foreground">Hot items selling fast this week across major resale platforms</p>
        </div>
      </header>

      <div className="container py-6">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all" className="font-heading">All Trends</TabsTrigger>
            <TabsTrigger value="y2k" className="font-heading">Y2K Fashion</TabsTrigger>
            <TabsTrigger value="designer" className="font-heading">Designer</TabsTrigger>
            <TabsTrigger value="sneakers" className="font-heading">Sneakers</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {trendingItems.map((item, index) => (
                <TrendingItemCard key={index} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="y2k" className="space-y-4">
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-4">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">💡 Y2K Tip:</span> Look for Juicy Couture, Von Dutch, Baby Phat, and Ed Hardy. Baggy jeans, mini skirts, and logo tees are especially hot on Depop!
                </p>
              </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 gap-4">
              {y2kItems.map((item, index) => (
                <TrendingItemCard key={index} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="designer" className="space-y-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">💡 Designer Tip:</span> Always authenticate designer items! Look for Louis Vuitton, Gucci, Chanel, and Coach. Check for serial numbers and quality stitching.
                </p>
              </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 gap-4">
              {designerItems.map((item, index) => (
                <TrendingItemCard key={index} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sneakers" className="space-y-4">
            <Card className="bg-chart-3/5 border-chart-3/20">
              <CardContent className="p-4">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">💡 Sneaker Tip:</span> Jordan 1s, Dunks, and Yeezys are gold! Check soles for wear and verify authenticity. New Balance 550s are trending hard right now.
                </p>
              </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 gap-4">
              {sneakerItems.map((item, index) => (
                <TrendingItemCard key={index} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Market Insights */}
        <Card className="mt-8">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-heading font-semibold text-xl text-foreground">This Week's Market Insights</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-accent" />
                  <span className="font-heading font-semibold text-foreground">Hottest Category</span>
                </div>
                <p className="text-sm text-muted-foreground">Athleisure (Lululemon, Athleta) - up 23% this week</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="font-heading font-semibold text-foreground">Rising Fast</span>
                </div>
                <p className="text-sm text-muted-foreground">Carhartt workwear - Gen Z discovering vintage utility</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-chart-3" />
                  <span className="font-heading font-semibold text-foreground">Platform to Watch</span>
                </div>
                <p className="text-sm text-muted-foreground">Depop - Y2K items selling 40% faster than other platforms</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
