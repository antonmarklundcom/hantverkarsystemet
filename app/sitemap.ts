import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/sa-funkar-det", "/kontakt", "/integritetspolicy", "/villkor"];

  return routes.map((route) => ({
    url: `${env.siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
