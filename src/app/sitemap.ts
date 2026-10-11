import type { MetadataRoute } from "next";
import { scholarshipEnabled } from "@/lib/features";

const baseUrl = "https://classicrollersamatx.org";
const routes = ["", "/events", ...(scholarshipEnabled ? ["/scholarship"] : []), "/membership", "/gallery", "/about", "/donate"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
