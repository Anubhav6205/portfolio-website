import { blogFeed, blurbs, fallbackPosts, hiddenSlugs, type Post } from "@/content/writing";

function pick(item: string, tag: string) {
  const m = item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return m ? m[1].trim() : "";
}

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/** Reads posts from the Hashnode RSS feed. Falls back to a static list if the feed is unreachable. */
export async function getPosts(limit = 6): Promise<Post[]> {
  try {
    const res = await fetch(blogFeed, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`feed ${res.status}`);
    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    const posts = items
      .map((item): Post | null => {
        const url = pick(item, "link");
        const slug = url.split("/").filter(Boolean).pop() ?? "";
        if (!url || hiddenSlugs.includes(slug)) return null;
        const extra = blurbs[slug];
        const date = new Date(pick(item, "pubDate"));
        return {
          title: decode(pick(item, "title")),
          url,
          date: Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10),
          blurb: extra?.blurb,
          tags: extra?.tags ?? [],
        };
      })
      .filter((p): p is Post => p !== null);
    if (!posts.length) throw new Error("empty feed");
    return posts.slice(0, limit);
  } catch {
    return fallbackPosts.slice(0, limit);
  }
}
