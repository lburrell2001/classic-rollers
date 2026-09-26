import type { MetadataRoute } from "next";

const baseUrl = "https://classicrollers.org";
const routes = ["", "/events", "/scholarship", "/membership", "/gallery", "/about", "/donate", "/insurance"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route === "/insurance" ? 0.9 : 0.7,
  }));
}
