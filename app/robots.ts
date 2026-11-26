import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

// Libera o site inteiro para buscadores e aponta o sitemap (fica em /robots.txt)
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
