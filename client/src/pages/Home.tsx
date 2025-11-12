import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, TrendingUp, Users, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Goodwill Gold" className="h-10 w-10" />
              <span className="font-heading font-bold text-xl text-foreground">Goodwill Gold</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
              <Link href="/dashboard">
                <Button size="sm" className="font-medium">Get Started</Button>
              </Link>
            </nav>
            <Link href="/dashboard">
              <Button size="sm" className="md:hidden font-medium">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                AI-Powered Thrift Shopping
              </div>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
                Turn Thrift Into <span className="text-primary">Gold</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Your AI treasure hunter for thrift store wins. Scan items, discover values, track trends, and join a community of smart resellers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="font-heading font-semibold text-base">
                    Start Finding Gold
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="font-heading font-semibold text-base">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <img src="/hero.png" alt="Goodwill Gold App" className="relative rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

{/* Features Section */}
<section id="features" className="py-16 md:py-24 bg-card/30">
  <div className="container">
    <div className="text-center space-y-4 mb-16">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
        Everything You Need to Find Gold
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Smart tools designed for thrift shoppers and resellers who want to make every find count.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* AI Scanner */}
      <Link href="/scanner">
        <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer">
          <CardContent className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-xl text-foreground">AI Scanner</h3>
            <p className="text-muted-foreground">
              Snap a photo and instantly identify brands, estimate resale value, and see if it's trending.
            </p>
          </CardContent>
        </Card>
      </Link>

      {/* Trend Tracker */}
      <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
        <CardContent className="p-6 space-y-4">
          <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-accent" />
          </div>
          <h3 className="font-heading font-semibold text-xl text-foreground">Trend Tracker</h3>
          <p className="text-muted-foreground">
            Real-time data from Poshmark, Depop, and eBay shows what's selling hot this week.
          </p>
        </CardContent>
      </Card>

      {/* Community Feed */}
      <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
        <CardContent className="p-6 space-y-4">
          <div className="h-12 w-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-chart-3" />
          </div>
          <h3 className="font-heading font-semibold text-xl text-foreground">Community Feed</h3>
          <p className="text-muted-foreground">
            Share your best finds, get inspired, and celebrate designer scores with fellow treasure hunters.
          </p>
        </CardContent>
      </Card>

      {/* Store Map */}
      <Link href="/stores">
        <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer">
          <CardContent className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-xl bg-chart-4/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-chart-4" />
            </div>
            <h3 className="font-heading font-semibold text-xl text-foreground">Store Map</h3>
            <p className="text-muted-foreground">
              Find nearby thrift and resale stores, complete with reviews and directions.
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  </div>
</section>
    </div>
  );
}
