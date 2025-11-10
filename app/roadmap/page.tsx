/**
 * Roadmap 页面
 *
 * 从单个 roadmap.mdx 文件读取并渲染所有 roadmap 项
 */

import { readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { parseRoadmapContent, getTaskStats } from "@/lib/roadmap-parser";
import { RoadmapTaskItem } from "@/components/roadmap/roadmap-task-item";
import Link from "next/link";
import { Rocket, ListTodo, CheckCircle2 } from "lucide-react";

export default function RoadmapPage() {
  // 读取 roadmap.mdx
  const roadmapPath = join(process.cwd(), "content/roadmap.mdx");
  const fileContent = readFileSync(roadmapPath, "utf-8");

  // 解析 frontmatter 和 content
  const { data, content } = matter(fileContent);

  // 解析 checkbox 任务
  const tasks = parseRoadmapContent(content);

  // 获取统计信息
  const stats = getTaskStats(tasks);

  // 分组任务（基于文件中的标题分组）
  // 由于我们的解析器会解析所有任务，我们需要手动提取分组
  // 简单方法：直接渲染所有任务（保留原始顺序）

  return (
    <main className="container h-auto min-h-screen flex flex-col md:mx-auto max-w-6xl md:px-4 py-12 md:py-20">
      {/* 顶部装饰区域 */}
      <section className="-mt-20 border border-fd-border border-b-0 grid-background-small p-12 px-12 relative"></section>

      {/* 标题区域 */}
      <section className="text-left border border-fd-border md:border-b border-b-0 px-4 py-6 md:p-6 bg-fd-background backdrop-blur-sm bg-opacity-50">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl">
          {data.title || "Roadmap"}
        </h1>
        <p className="text-fd-muted-foreground">
          {data.description ||
            "Here is a list of features we are currently working on, have designed, or are in the backlog."}
        </p>

        {/* 统计信息 */}
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <Rocket className="h-4 w-4 text-fd-primary  " />
            <span className="text-fd-muted-foreground">
              Development / Backlog:{" "}
              <strong className="text-fd-foreground">{stats.incomplete}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <CheckCircle2 className="h-4 w-4 text-fd-primary" />
            <span className="text-fd-muted-foreground">
              Shipped:{" "}
              <strong className="text-fd-foreground">{stats.completed}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ListTodo className="h-4 w-4 text-fd-muted-foreground" />
            <span className="text-fd-muted-foreground">
              Total:{" "}
              <strong className="text-fd-foreground">{stats.total}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* 装饰分隔 */}
      <section className="border border-fd-border border-t-0 p-0 md:p-6 px-12 zimbra-background"></section>

      {/* Roadmap 内容区域 */}
      <section className="relative flex flex-col border border-fd-border bg-fd-background px-4 md:px-8 py-6 pt-8 md:pt-6">
        <div className="max-w-4xl mx-auto w-full space-y-1">
          {tasks.map((task) => (
            <RoadmapTaskItem key={task.id} task={task} />
          ))}
        </div>
      </section>

      {/* 背景装饰 */}
      <section className="absolute inset-0 -z-10 border border-fd-border grid-background max-h-1/2 top-2/5 border-b md:block hidden"></section>

      {/* 装饰分隔 */}
      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background bg-fd-background"></section>

      {/* 页脚 */}
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
