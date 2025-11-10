/**
 * Blog Detail Page
 *
 * Displays a single blog post with full content
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogSource } from "@/lib/source";
import { BlogDetail } from "@/components/blog/BlogDetail";
import type { Metadata } from "next";
import { Calendar, User } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogSource.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = blogSource.getPage([slug]);

  if (!page) {
    return {
      title: "Post Not Found - Task Genius",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${page.data.title} - Task Genius Blog`,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "article",
      publishedTime: page.data.date,
      authors: [page.data.author],
      tags: page.data.tags,
      images: "/banner.png",
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: "/banner.png",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = blogSource.getPage([slug]);

  if (!page) {
    notFound();
  }

  const formattedDate = new Date(page.data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const frontmatter = {
    title: page.data.title,
    date: page.data.date,
    author: page.data.author,
    description: page.data.description,
    tags: page.data.tags,
  };

  return (
    <main className="container h-auto min-h-screen flex flex-col md:mx-auto max-w-6xl md:px-4 py-12 md:py-20">
      {/* Top decoration */}
      <section className="-mt-20 border border-fd-border border-b-0 grid-background-small p-12 px-12 relative"></section>

      {/* Header with back button */}
      <section className="text-left border border-fd-border md:border-b border-b-0 px-4 py-6 md:p-6 bg-fd-background backdrop-blur-sm bg-opacity-50">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-primary mb-4 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        <h1 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-fd-foreground">
          {page.data.title}
        </h1>

        <p className="text-fd-muted-foreground">{page.data.description}</p>

        <div className="flex items-center gap-2 mt-4">
          <div className="font-mono flex items-center gap-2 text-fd-muted-foreground mr-1">
            <Calendar className="size-4" />
            <span className="text-sm">{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 flex-1 text-right text-fd-muted-foreground">
            {/* <User className="size-4" /> */}
            <span className="text-sm">{frontmatter.author}</span>
          </div>

          {/* Author */}

          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 border border-fd-border text-fd-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Decorative divider */}
      <section className="border border-fd-border border-t-0 p-0 md:p-6 px-12 zimbra-background"></section>

      {/* Content */}
      <section className="flex-1 px-8 flex flex-col md:flex-row space-x-0 md:space-x-6 border border-t-0 border-fd-border border-b p-6 bg-fd-background backdrop-blur-sm bg-opacity-50 md:pt-10">
        <BlogDetail page={page} />
      </section>

      {/* Background decoration */}
      <section className="absolute inset-0 -z-10 border border-fd-border grid-background max-h-1/2 top-3/5 border-b md:block hidden"></section>

      {/* Decorative divider */}
      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background bg-fd-background"></section>

      {/* Back to blog section */}
      <section className="border border-fd-border pt-12 px-6 md:px-12 pb-6 relative">
        <div className="border-r border-b border-fd-border text-sm text-fd-muted-foreground absolute top-0 left-0 px-2 py-2 bg-fd-background backdrop-blur-sm">
          <span className="text-fd-primary font-sans font-bold">02</span> More
          Posts
        </div>

        <div className="text-center mt-4">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-fd-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring disabled:pointer-events-none disabled:opacity-50 text-fd-primary border border-fd-border shadow-fd-background/20 h-11 px-6 hover:bg-fd-muted/50"
          >
            <ArrowLeft className="mr-2 size-4" />
            View All Posts
          </Link>
        </div>
      </section>

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
          </Link>
        </div>
      </section>
    </main>
  );
}
