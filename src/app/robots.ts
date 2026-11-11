import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Everyone may crawl the public site, including AI assistants (ChatGPT,
 * Claude, Perplexity, Google AI), so the firm can be cited in AI answers.
 * The admin panel and API routes are off-limits.
 */
const PRIVATE = ["/admin", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "Bingbot",
        ],
        allow: "/",
        disallow: PRIVATE,
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
