import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Plus,
  Star,
  Calendar,
  Navigation,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Store {
  id: number;
  name: string;
  type: string;
  address: string;
  lastVisit: string;
  totalFinds: number;
  rating: number;
  notes: string;
  distance: string;
}

const STORAGE_KEY = "goodwill-gold:my-thrift-spots";

const mockStores: Store[] = [
  {
    id: 1,
    name: "Goodwill Downtown",
    type: "Goodwill",
    address: "123 Main St, Downtown",
    lastVisit: "2 days ago",
    totalFinds: 24,
    rating: 4.5,
    notes: "Great for vintage Nike and designer bags. New stock on Mondays!",
    distance: "0.8 mi",
  },
  {
    id: 2,
    name: "Salvation Army East",
    type: "Salvation Army",
    address: "456 Oak Ave, East Side",
    lastVisit: "1 week ago",
    totalFinds: 18,
    rating: 4.0,
    notes:
      "Good selection of Lululemon. Check the back racks for hidden gems.",
    distance: "1.2 mi",
  },
  {
    id: 3,
    name: "Goodwill Outlet (The Bins)",
    type: "Goodwill Outlet",
    address: "789 Industrial Blvd",
    lastVisit: "3 days ago",
    totalFinds: 42,
    rating: 5.0,
    notes:
      "Pay by the pound! Chaotic but amazing finds. Bring gloves. Best on weekday mornings.",
    distance: "3.5 mi",
  },
  {
    id: 4,
    name: "Buffalo Exchange",
    type: "Consignment",
    address: "321 Trendy St, Arts District",
    lastVisit: "5 days ago",
    totalFinds: 12,
    rating: 3.5,
    notes:
      "Curated selection, higher prices but quality items. Good for Free People and Madewell.",
    distance: "1.8 mi",
  },
  {
    id: 5,
    name: "Thrift Giant",
    type: "Thrift Store",
    address: "555 Commerce Way",
    lastVisit: "1 week ago",
    totalFinds: 31,
    rating: 4.5,
    notes:
      "Huge store! Great for vintage denim. Half-off Saturdays. Furniture section is gold.",
    distance: "2.3 mi",
  },
];

function loadInitialStores(): Store[] {
  if (typeof window === "undefined") return mockStores;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockStores;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return mockStores;
    return parsed;
  } catch {
    return mockStores;
  }
}

function StoreCard({ store }: { store: Store }) {
  const openDirections = () => {
    const encodedAddress = encodeURIComponent(store.address + " " + store.name);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(mapsUrl, "_blank");
    toast.success(`🗺️ Opening directions to ${store.name}...`);
  };

  return (
    <Card className="hover:shadow-lg transition-all hover:border-primary/50">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-heading font-bold text-lg text-foreground">
              {store.name}
            </h3>
            <p className="text-sm text-muted-foreground">{store.address}</p>
          </div>
          <Badge variant="outline">{store.type}</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-border">
          <div className="text-center">
            <div className="font-heading font-bold text-lg text-foreground">
              {store.totalFinds}
            </div>
            <div className="text-xs text-muted-foreground">Finds</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-heading font-bold text-lg text-foreground">
                {store.rating.toFixed(1)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
          <div className="text-center">
            <div className="font-heading font-bold text-lg text-foreground">
              {store.distance || "—"}
            </div>
            <div className="text-xs text-muted-foreground">Away</div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Last visit: {store.lastVisit}</span>
          </div>
          <p className="text-sm text-foreground bg-muted/30 rounded-lg p-3">
            {store.notes || "No notes yet – add your sourcing tips here."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 font-heading font-medium"
            onClick={openDirections}
          >
            <Navigation className="h-4 w-4 mr-2" />
            Directions
          </Button>
          <Button
            size="sm"
            className="flex-1 font-heading font-medium"
            onClick={() => toast.info("📝 Edit store coming soon!")}
          >
            Edit Notes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Stores() {
  const [stores, setStores] = useState<Store[]>(() => loadInitialStores());
  const [isLocating, setIsLocating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("Thrift Store");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("4.5");
  const [notes, setNotes] = useState("");

  // Persist to localStorage whenever stores change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
    } catch {
      // ignore
    }
  }, [stores]);

  const handleOpenMap = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported in this browser.");
      window.open(
        "https://www.google.com/maps/search/thrift+or+resale+stores/",
        "_blank"
      );
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const mapsUrl = `https://www.google.com/maps/search/thrift+resale+vintage+stores/@${latitude},${longitude},13z`;
        setIsLocating(false);
        window.open(mapsUrl, "_blank");
        toast.success("📍 Showing nearby thrift stores...");
      },
      () => {
        setIsLocating(false);
        toast.error("Unable to get your location — showing general map.");
        window.open(
          "https://www.google.com/maps/search/thrift+or+resale+stores/",
          "_blank"
        );
      }
    );
  };

  const handleAddStore = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName || !trimmedAddress) {
      toast.error("Please add at least a store name and address.");
      return;
    }

    const parsedRating = Number(rating);
    const safeRating =
      Number.isFinite(parsedRating) && parsedRating > 0 && parsedRating <= 5
        ? parsedRating
        : 4.5;

    const newStore: Store = {
      id: Date.now(),
      name: trimmedName,
      type: type.trim() || "Thrift Store",
      address: trimmedAddress,
      lastVisit: "Not yet",
      totalFinds: 0,
      rating: safeRating,
      notes: notes.trim(),
      distance: "—",
    };

    setStores((prev) => [newStore, ...prev]);

    // Reset form
    setName("");
    setType("Thrift Store");
    setAddress("");
    setRating("4.5");
    setNotes("");
    setIsAdding(false);

    toast.success("✨ Store added to My Thrift Spots!");
  };

  const totalFindsAll = stores.reduce((sum, s) => sum + (s.totalFinds || 0), 0);
  const avgRating =
    stores.length > 0
      ? stores.reduce((sum, s) => sum + (s.rating || 0), 0) / stores.length
      : 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <h1 className="font-heading font-bold text-xl text-foreground">
              My Thrift Spots
            </h1>
            <Button
              size="sm"
              className="font-heading font-semibold"
              onClick={() => setIsAdding((v) => !v)}
            >
              <Plus className="h-4 w-4 mr-2" />
              {isAdding ? "Close" : "Add Store"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-6 space-y-6">
        {/* Map Header */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video bg-gradient-to-br from-chart-3/20 to-primary/20 flex flex-col items-center justify-center text-center p-6">
              <MapPin className="h-16 w-16 text-primary mb-3" />
              <h2 className="font-heading font-semibold text-lg text-foreground">
                Find Resale Stores Near You
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Uses your location to search nearby thrift & vintage shops.
              </p>
              <Button
                variant="outline"
                onClick={handleOpenMap}
                className="font-heading font-medium"
                disabled={isLocating}
              >
                {isLocating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Locating...
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4 mr-2" /> Open in Google Maps
                  </>
                )}
              </Button>
              <p className="mt-3 text-xs text-muted-foreground max-w-md mx-auto">
                Tip: When you discover a great spot in Google Maps, copy the
                name & address and add it below so you can track your best
                sourcing locations over time.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Add Store Form */}
        {isAdding && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-heading font-semibold text-lg text-foreground mb-2">
                Add a New Thrift Spot
              </h2>
              <form onSubmit={handleAddStore} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input
                      id="store-name"
                      placeholder="e.g., Goodwill - Elm Street"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="store-type">Store Type</Label>
                    <Input
                      id="store-type"
                      placeholder="Goodwill, Salvation Army, Vintage, etc."
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="store-address">Address</Label>
                  <Input
                    id="store-address"
                    placeholder="Paste from Google Maps"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="store-rating">Rating (1–5)</Label>
                    <Input
                      id="store-rating"
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Last Visit</Label>
                    <Input
                      disabled
                      value="Set automatically after your first trip (coming soon)"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="store-notes">Notes</Label>
                  <Textarea
                    id="store-notes"
                    placeholder="Best days to go, what you usually find, pricing, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAdding(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="font-heading font-semibold">
                    Save Store
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Stats + Store List */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="font-heading font-bold text-2xl text-foreground">
                {stores.length}
              </div>
              <div className="text-xs text-muted-foreground">Saved Stores</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="font-heading font-bold text-2xl text-foreground">
                {totalFindsAll}
              </div>
              <div className="text-xs text-muted-foreground">Total Finds</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="font-heading font-bold text-2xl text-foreground">
                {stores.length ? avgRating.toFixed(1) : "—"}
              </div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Store Cards */}
        <div className="space-y-4">
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Your Stores
          </h2>
          {stores.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No stores saved yet. Use <strong>Add Store</strong> above after
              you find a good spot on Google Maps.
            </p>
          ) : (
            stores.map((store) => <StoreCard key={store.id} store={store} />)
          )}
        </div>
      </div>
    </div>
  );
}
