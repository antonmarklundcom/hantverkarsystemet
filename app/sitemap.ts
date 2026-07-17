import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = ["", "/sa-funkar-det", "/kontakt", "/integritetspolicy", "/villkor"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
