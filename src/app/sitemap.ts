import type { MetadataRoute } from "next";
import { statSync } from "node:fs";
import { join } from "node:path";

function safeMtime(relPath: string, fallback: Date): Date {
  try {
    return statSync(join(process.cwd(), relPath)).mtime;
  } catch {
    return fallback;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://breezehw.com";
  const now = new Date();

  const tools: Array<{ slug: string; sourcePath: string }> = [
    { slug: "bom-estimator", sourcePath: "src/app/tools/bom-estimator/page.tsx" },
    { slug: "nre-simulator", sourcePath: "src/app/tools/nre-simulator/page.tsx" },
    { slug: "dfm-checklist", sourcePath: "src/app/tools/dfm-checklist/page.tsx" },
    { slug: "cert-navigator", sourcePath: "src/app/tools/cert-navigator/page.tsx" },
  ];

  return [
    {
      url: `${base}/`,
      lastModified: safeMtime("src/app/page.tsx", now),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/faq`,
      lastModified: safeMtime("src/app/faq/page.tsx", now),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...tools.map((t) => ({
      url: `${base}/tools/${t.slug}`,
      lastModified: safeMtime(t.sourcePath, now),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${base}/llms.txt`,
      lastModified: safeMtime("public/llms.txt", now),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/llms-full.txt`,
      lastModified: safeMtime("public/llms-full.txt", now),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/breeze-deck.pdf`,
      lastModified: safeMtime("public/breeze-deck.pdf", now),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${base}/breeze-outreach-kit.pdf`,
      lastModified: safeMtime("public/breeze-outreach-kit.pdf", now),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
