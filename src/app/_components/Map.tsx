"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { api } from "~/trpc/react";
import type { RouterOutputs } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Icon } from "leaflet";
import { useEffect } from "react";

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
      if (!response.ok) {
        console.error("Failed to load marker icon");
      }
    };
    void copyMarkerIcons();
  }, []);

  if (!restaurants) return <div>Loading...</div>;

  return (
    <MapContainer
      center={[51.505, -0.09]} // Default center, you might want to adjust this
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={[restaurant.latitude, restaurant.longitude]}
          icon={icon}
        >
          <Popup>
            <div>
              <h3 className="text-lg font-bold">{restaurant.name}</h3>
              <button
                onClick={() => router.push(`/restaurants/${restaurant.id}`)}
                className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                View Menu
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 