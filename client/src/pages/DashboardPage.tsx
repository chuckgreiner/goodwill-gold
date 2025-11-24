import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Camera, TrendingUp, User } from "lucide-react";
import { Link } from "wouter";

export default function DashboardPage() {
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
          <div className="flex items-center gap-4">
            <User className="h-5 w-5 text-muted-foreground" />
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 py-12">
        <div className="container space-y-10">
          <div className="text-center space-y-3">
            <h1 className="font-heading font-bold text-4xl text-foreground">
              Welcome to Your Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Track your finds, trends, and insights — all in one place.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Launch Scanner */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-12 w-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground">
                  Start a Scan
                </h3>
                <p className="text-muted-foreground">
                  Upload or take a photo to identify brand and resale value.
                </p>
                <Link href="/scanner">
                  <Button size="sm" className="font-medium mt-2">
                    Launch Scanner
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* View Trends */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-12 w-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground">
                  View Trends
                </h3>
                <p className="text-muted-foreground">
                  Discover what’s selling hot on Poshmark, Depop, and eBay.
                </p>
                <Link href="/insights">
                  <Button variant="outline" size="sm" className="mt-2 font-medium">
                    See Insights
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* My Finds */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-12 w-12 mx-auto rounded-xl bg-chart-3/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-chart-3" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground">
                  My Finds
                </h3>
                <p className="text-muted-foreground">
                  Review your past scans, valuations, and shared posts.
                </p>
                <Button variant="outline" size="sm" className="mt-2 font-medium">
                  View History
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { label: "Total Scans", value: "142" },
              { label: "Total Value Found", value: "$7,830" },
              { label: "Stores Visited", value: "23" },
            ].map((stat, i) => (
              <Card key={i} className="text-center py-8 border-2 border-muted/30">
                <CardContent>
                  <div className="font-heading text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2025 Goodwill Gold. All rights reserved.</p>
      </footer>
    </div>
  );
}
