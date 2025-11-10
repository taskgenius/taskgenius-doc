import { HomeLayout } from "fumadocs-ui/layouts/home";
import { type ReactNode } from "react";
import { baseOptions } from "../layout.config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Genius Desktop - Join Waitlist",
  description: "Join the waitlist for Task Genius Desktop App.",
};

export default function AppWaitlistLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
