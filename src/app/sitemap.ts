import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://breezehw.com";
  const now = new Date();
  const tools = [
    "bom-estimator",
    "nre-simulator",
    "dfm-checklist",
    "cert-navigator",
  ];

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...tools.map((t) => ({
      url: `${base}/tools/${t}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
