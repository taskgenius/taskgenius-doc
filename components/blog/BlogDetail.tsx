import type { BlogPage } from "@/lib/source";

interface BlogDetailProps {
  page: BlogPage;
}

// Render the MDX content from page.data.body
function RenderContent({ page }: { page: BlogPage }) {
  const MDXContent = page.data.body;
  return <MDXContent />;
}

export function BlogDetail({ page }: BlogDetailProps) {
  return (
    <>
      {/* Content */}
      <div className="prose prose-fd dark:prose-invert max-w-none break-words">
        <RenderContent page={page} />
      </div>
    </>
  );
}
