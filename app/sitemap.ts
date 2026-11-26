import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

// Lista de páginas para o Google (fica em /sitemap.xml)
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: agora, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/privacidade`, lastModified: agora, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/termos`, lastModified: agora, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/trocas`, lastModified: agora, changeFrequency: "yearly", priority: 0.2 },
  ];
}
