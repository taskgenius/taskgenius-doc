import { getBlogRSS } from "@/lib/rss";

export const revalidate = 3600; // Revalidate every hour

export function GET() {
  const rss = getBlogRSS();

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
