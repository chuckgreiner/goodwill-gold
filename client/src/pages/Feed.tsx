import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Find {
  id: number;
  user: {
    name: string;
    initials: string;
  };
  brand: string;
  item: string;
  value: number;
  store: string;
  image: string;
  likes: number;
  comments: number;
  timeAgo: string;
  trend: "hot" | "rare" | "deal" | null;
}

const mockFinds: Find[] = [
  {
    id: 1,
    user: { name: "Sarah M.", initials: "SM" },
    brand: "Lululemon",
    item: "Align Leggings",
    value: 68,
    store: "Goodwill Downtown",
    image: "bg-gradient-to-br from-purple-400 to-pink-400",
    likes: 142,
    comments: 23,
    timeAgo: "2h ago",
    trend: "hot"
  },
  {
    id: 2,
    user: { name: "Maya K.", initials: "MK" },
    brand: "Vintage Levi's",
    item: "501 Jeans",
    value: 52,
    store: "Salvation Army",
    image: "bg-gradient-to-br from-blue-400 to-indigo-400",
    likes: 98,
    comments: 15,
    timeAgo: "4h ago",
    trend: null
  },
  {
    id: 3,
    user: { name: "Lisa R.", initials: "LR" },
    brand: "Kate Spade",
    item: "Crossbody Bag",
    value: 125,
    store: "Thrift Giant",
    image: "bg-gradient-to-br from-amber-400 to-orange-400",
    likes: 256,
    comments: 42,
    timeAgo: "6h ago",
    trend: "rare"
  },
  {
    id: 4,
    user: { name: "Emma T.", initials: "ET" },
    brand: "Patagonia",
    item: "Fleece Jacket",
    value: 45,
    store: "Goodwill Outlet",
    image: "bg-gradient-to-br from-teal-400 to-cyan-400",
    likes: 187,
    comments: 31,
    timeAgo: "8h ago",
    trend: "deal"
  },
  {
    id: 5,
    user: { name: "Jordan P.", initials: "JP" },
    brand: "Nike",
    item: "Air Jordan 1",
    value: 195,
    store: "Plato's Closet",
    image: "bg-gradient-to-br from-red-400 to-pink-400",
    likes: 423,
    comments: 67,
    timeAgo: "12h ago",
    trend: "hot"
  },
  {
    id: 6,
    user: { name: "Alex C.", initials: "AC" },
    brand: "Free People",
    item: "Boho Dress",
    value: 38,
    store: "Buffalo Exchange",
    image: "bg-gradient-to-br from-rose-400 to-pink-400",
    likes: 134,
    comments: 19,
    timeAgo: "1d ago",
    trend: null
  }
];

function FindCard({ find }: { find: Find }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(find.likes);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  const getTrendBadge = () => {
    switch (find.trend) {
      case "hot":
        return <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">🔥 Hot</Badge>;
      case "rare":
        return <Badge className="absolute top-3 right-3 bg-chart-3 text-white">💎 Rare</Badge>;
      case "deal":
        return <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">💰 Deal</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* User Header */}
        <div className="p-4 flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary font-heading font-semibold">
              {find.user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-heading font-semibold text-sm text-foreground">{find.user.name}</p>
            <p className="text-xs text-muted-foreground">{find.timeAgo}</p>
          </div>
        </div>

        {/* Image */}
        <div className="relative aspect-square">
          <div className={`w-full h-full ${find.image} flex items-center justify-center`}>
            <div className="text-center text-white space-y-2">
              <div className="text-6xl font-heading font-bold opacity-20">
                {find.brand.charAt(0)}
              </div>
            </div>
          </div>
          {getTrendBadge()}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Brand & Item */}
          <div>
            <h3 className="font-heading font-bold text-lg text-foreground">{find.brand}</h3>
            <p className="text-sm text-muted-foreground">{find.item}</p>
          </div>

          {/* Value & Store */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xl text-primary">${find.value}</span>
              <span className="text-xs text-muted-foreground">estimated value</span>
            </div>
            <Badge variant="outline" className="text-xs">{find.store}</Badge>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLike}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-accent text-accent' : ''}`} />
                <span className="font-medium">{likeCount}</span>
              </button>
              <button 
                onClick={() => toast.info("Comments coming soon!")}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">{find.comments}</span>
              </button>
            </div>
            <button 
              onClick={() => toast.success("Link copied!")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Feed() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <h1 className="font-heading font-bold text-xl text-foreground">Thrift Finds</h1>
            <Button size="sm" className="font-heading font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Share Find
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-6 space-y-6">
        {/* Stats Banner */}
        <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-chart-3/10">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-heading font-bold text-2xl text-foreground">2.4K</div>
                <div className="text-xs text-muted-foreground">Finds Today</div>
              </div>
              <div>
                <div className="font-heading font-bold text-2xl text-foreground">$125K</div>
                <div className="text-xs text-muted-foreground">Total Value</div>
              </div>
              <div>
                <div className="font-heading font-bold text-2xl text-foreground">15K</div>
                <div className="text-xs text-muted-foreground">Active Hunters</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed */}
        <div className="grid md:grid-cols-2 gap-6">
          {mockFinds.map((find) => (
            <FindCard key={find.id} find={find} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center pt-4">
          <Button variant="outline" size="lg" className="font-heading font-semibold">
            Load More Finds
          </Button>
        </div>
      </div>
    </div>
  );
}
