import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Trash } from "lucide-react";

export default function MyThriftSpots() {
  const [spots, setSpots] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("thriftSpots") || "[]");
    setSpots(saved);
  }, []);

  const removeSpot = (id: string) => {
    const updated = spots.filter((s) => s.place_id !== id);
    setSpots(updated);
    localStorage.setItem("thriftSpots", JSON.stringify(updated));
  };

  if (spots.length === 0) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-3xl font-heading font-bold">My Thrift Spots</h1>
        <p className="text-muted-foreground mt-2">
          You haven’t saved any stores yet. Add some from the Store Finder!
        </p>
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-3xl font-heading font-bold">My Thrift Spots ⭐</h1>

      {spots.map((spot) => (
        <Card key={spot.place_id} className="p-4">
          <CardContent>
            <h2 className="font-heading text-xl">{spot.name}</h2>
            <p className="text-muted-foreground">{spot.address}</p>

            {spot.rating && (
              <p className="mt-1">Rating: ⭐ {spot.rating}</p>
            )}

            <div className="flex gap-2 mt-4">
              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2"
              >
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    spot.name + " " + spot.address
                  )}`}
                  target="_blank"
                >
                  <MapPin size={16} />
                  Open in Maps
                </a>
              </Button>

              <Button
                variant="destructive"
                onClick={() => removeSpot(spot.place_id)}
                className="flex items-center gap-2"
              >
                <Trash size={16} />
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
