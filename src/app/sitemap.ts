import { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getPublishedProjects, isWorkEnabled } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: {
    path: string;
    priority: number;
    changeFrequency: "monthly" | "yearly";
  }[] = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  ];

  // The work section + project pages only exist once 3+ projects are published.
  if (await isWorkEnabled()) {
    pages.push({ path: "/work", priority: 0.7, changeFrequency: "monthly" });
    for (const p of await getPublishedProjects()) {
      pages.push({
        path: `/work/${p.slug}`,
        priority: 0.6,
        changeFrequency: "monthly",
      });
    }
  }

  const lastModified = new Date();
  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
