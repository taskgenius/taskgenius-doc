import { Feed } from "feed";
import { blogSource } from "@/lib/source";

const baseUrl = "https://taskgenius.md";

export function getBlogRSS() {
  const feed = new Feed({
    title: "Task Genius Blog",
    id: `${baseUrl}/blog`,
    link: `${baseUrl}/blog`,
    language: "en",
    description: "Thoughts, insights, and updates about Task Genius and productivity",

    image: `${baseUrl}/banner.png`,
    favicon: `${baseUrl}/icon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Boninall(Quorafind)`,
  });

  // Sort posts by date (newest first)
  const posts = blogSource.getPages().sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });

  for (const page of posts) {
    feed.addItem({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      link: `${baseUrl}${page.url}`,
      date: new Date(page.data.date),

      author: [
        {
          name: page.data.author,
        },
      ],

      category: page.data.tags.map((tag) => ({ name: tag })),
    });
  }

  return feed.rss2();
}
