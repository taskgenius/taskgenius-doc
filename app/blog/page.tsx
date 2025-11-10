/**
 * Blog List Page
 *
 * Displays all blog posts in a grid layout
 */

import Link from "next/link";
import { FileText, Rss } from "lucide-react";
import { blogSource } from "@/lib/source";
import { BlogCard } from "@/components/blog/blog-card";

export const revalidate = 3600; // Revalidate every hour

export default function BlogPage() {
  const posts = blogSource.getPages();

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <main className="container h-auto min-h-screen flex flex-col md:mx-auto max-w-6xl md:px-4 py-12 md:py-20">
      {/* Top decoration */}
      <section className="-mt-20 border border-fd-border border-b-0 grid-background-small p-12 px-12 relative"></section>

      {/* Header */}
      <section className="text-left border border-fd-border md:border-b border-b-0 px-4 py-6 md:p-6 bg-fd-background backdrop-blur-sm bg-opacity-50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl">
              Blog
            </h1>
            <p className="text-fd-muted-foreground mb-4">
              Thoughts, insights, and updates about Task Genius and productivity
            </p>

            {/* Statistics */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-fd-primary" />
                <span className="text-fd-muted-foreground">
                  Posts:{" "}
                  <strong className="text-fd-foreground">{posts.length}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* RSS Button */}
          <Link
            href="/blog/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-fd-border text-fd-foreground hover:bg-fd-muted/50 hover:border-fd-primary/50 transition-colors text-sm"
            title="Subscribe via RSS"
          >
            <Rss className="size-4" />
            <span className="hidden sm:inline">RSS Feed</span>
          </Link>
        </div>
      </section>

      {/* Decorative divider */}
      <section className="border border-fd-border border-t-0 p-0 md:p-6 px-12 zimbra-background"></section>

      {/* Blog posts grid */}
      <section className="relative flex flex-col border border-fd-border md:border-t-0 bg-fd-background px-4 md:px-8 py-6 pt-8 md:pt-12">
        <div className="border-r border-b border-fd-border text-sm text-fd-muted-foreground absolute top-0 left-0 px-2 py-2 bg-fd-background backdrop-blur-sm">
          <span className="text-fd-primary font-sans font-bold">01</span> Latest
          Posts
        </div>

        {sortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {sortedPosts.map((post) => (
              <BlogCard key={post.url} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-fd-muted-foreground">
            <p>No blog posts yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Background decoration */}
      {/* <section className="absolute inset-0 -z-10 border border-fd-border grid-background max-h-1/2 top-2/5 border-b md:block hidden"></section> */}

      {/* Decorative divider */}
      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background bg-fd-background"></section>

      {/* Footer */}
      <section className="border border-fd-border -mb-20 pt-12 px-6 md:px-12 pb-6 relative text-right">
        <div className="prose prose-fd max-w-none">
          <Link
            href="https://boninall.com"
            className="text-fd-muted-foreground hover:text-fd-primary no-underline"
          >
            © {new Date().getFullYear()} Boninall(Quorafind)
          </Link>{" "}
        </div>
      </section>
    </main>
  );
}
