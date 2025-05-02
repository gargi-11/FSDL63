import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CarbonTrack - Carbon Credit Tracker",
    short_name: "CarbonTrack",
    description: "Track your carbon footprint with blockchain technology",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#556B2F",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
