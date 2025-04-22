import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AIDA - University AI Assistant",
    short_name: "AIDA",
    description:
      "Transform how education, research, and entrepreneurship are delivered by leveraging AI and data analytics through operational excellence.",
    start_url: "/",
    display: "standalone",
    categories: ["education", "ai", "productivity"],
    background_color: "#171717",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/opengraph-image.png",
        type: "image/png",
        sizes: "1200x630",
      },
    ],
  };
}