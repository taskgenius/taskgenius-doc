import { Metadata } from "next";
import type { ReactNode } from "react";
import { baseOptions } from "../layout.config";
import { HomeLayout } from "fumadocs-ui/layouts/home";

export const metadata: Metadata = {
  title: "Blog - Task Genius",
  description: "Blog about Task Genius and productivity.",
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
