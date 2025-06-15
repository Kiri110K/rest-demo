"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Icon } from "leaflet";
import { useEffect } from "react";
import slugify from "slugify";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardTitle } from "../../components/ui/card";

// Fix for default marker icons in Next.js
const icon = new Icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// type Restaurant = RouterOutputs["restaurants"]["getAll"][number];

export function Map() {
  const router = useRouter();
  const { data: restaurants } = api.restaurants.getAll.useQuery();

  useEffect(() => {
    // Copy marker icons to public folder
    const copyMarkerIcons = async () => {
      const response = await fetch("/marker-icon.png");
      // No need to handle error
    };
    void copyMarkerIcons();
  }, []);

  if (!restaurants) return <div>Loading...</div>;

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={[restaurant.latitude, restaurant.longitude]}
          icon={icon}
        >
          <Popup>
            <Card className="p-2 min-w-[180px]">
              <CardContent className="p-0">
                <CardTitle className="text-base mb-2">{restaurant.name}</CardTitle>
                <Button size="sm" onClick={() => router.push(`/${slugify(restaurant.name, { lower: true })}`)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 