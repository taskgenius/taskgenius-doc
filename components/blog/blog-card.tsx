/**
 * Blog Card Component
 *
 * Displays a single blog post card with title, description, date, author, and tags
 */

import Link from "next/link";
import { Calendar } from "lucide-react";
import type { BlogPage } from "@/lib/source";

interface BlogCardProps {
  post: BlogPage;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={post.url}
      className="block group border border-fd-border hover:border-fd-primary/50 transition-all bg-fd-background/50 p-6"
    >
      {/* Title */}
      <h3 className="text-xl font-semibold text-fd-foreground group-hover:text-fd-primary transition-colors mb-3">
        {post.data.title}
      </h3>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-fd-muted-foreground mb-3">
        <div className="flex items-center gap-1.5">
          <Calendar className="size-4" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {/* <User className="size-4" /> */}
          <span>{post.data.author}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-fd-muted-foreground text-sm mb-4 line-clamp-2">
        {post.data.description}
      </p>

      {/* Tags */}
    </Link>
  );
}
