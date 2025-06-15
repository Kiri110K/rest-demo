"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map").then(mod => mod.Map), { ssr: false });

export default function MapClientWrapper() {
  return <Map />;
} 