/**
 * Roadmap 任务项渲染组件
 *
 * 递归渲染任务树，支持：
 * - 分类标题（普通列表项，较大字体，无 checkbox）
 * - 嵌套层级显示
 * - 已完成任务删除线样式
 * - 链接跳转
 * - 元数据显示（日期、版本）
 * - 多行描述文本
 */

import Link from "next/link";
import type { RoadmapTask } from "@/lib/roadmap-parser";
import { CheckCircle2, Circle } from "lucide-react";

interface RoadmapTaskItemProps {
  task: RoadmapTask;
  level?: number;
}

export function RoadmapTaskItem({ task, level = 0 }: RoadmapTaskItemProps) {
  // 计算缩进
  const paddingLeft = level * 24; // 每层级缩进 24px (1.5rem)

  // 分类标题使用特殊样式
  if (task.isCategory) {
    return (
      <div className="roadmap-task-category">
        {/* 分类标题 */}
        <div
          className="flex items-start py-3 group"
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <div className="flex-1 min-w-0">
            <h3 className="text-lg text-fd-foreground">{task.title}</h3>
            {task.description && (
              <p className="mt-1 text-sm text-fd-muted-foreground">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* 递归渲染子任务 */}
        {task.children.length > 0 && (
          <div className="roadmap-task-children">
            {task.children.map((child) => (
              <RoadmapTaskItem key={child.id} task={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // 普通任务渲染
  return (
    <div className="roadmap-task-item">
      {/* 任务主体 */}

      <div
        className="flex items-start gap-3 py-2 group"
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        {/* Checkbox 图标 */}
        <div className="flex-shrink-0 mt-1">
          {task.completed ? (
            <CheckCircle2 className="h-4 w-4 text-fd-muted-foreground" />
          ) : (
            <Circle className="h-4 w-4 text-fd-primary" />
          )}
        </div>

        {/* 任务内容 */}
        <div className="group flex-1 min-w-0">
          {/* 标题 */}
          <div className="flex items-baseline gap-2 flex-wrap">
            {task.link ? (
              <Link
                href={task.link}
                className={`hover:text-fd-accent-foreground ${
                  task.completed
                    ? "text-fd-muted-foreground line-through"
                    : "text-fd-foreground hover:text-fd-primary"
                }`}
              >
                {task.title}
              </Link>
            ) : (
              <span
                className={`font-medium ${
                  task.completed
                    ? "text-fd-muted-foreground line-through"
                    : "text-fd-foreground"
                }`}
              >
                {task.title}
              </span>
            )}

            {/* 元数据标签 */}
            <div className="flex items-center gap-2 text-xs">
              {task.version && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-fd-primary/10 text-fd-primary font-mono">
                  v{task.version}
                </span>
              )}
            </div>

            {task.completed && task.description && (
              <span
                className={`${
                  task.completed ? "group-hover:block hidden" : ""
                } text-sm ${
                  task.completed
                    ? "text-fd-muted-foreground/70"
                    : "text-fd-muted-foreground"
                }`}
              >
                {task.description}
              </span>
            )}
          </div>

          {/* 描述 */}
          {!task.completed && task.description && (
            <span
              className={`mt-1 text-sm 
                  text-fd-muted-foreground
              `}
            >
              {task.description}
            </span>
          )}
        </div>
      </div>
      {/* 递归渲染子任务 */}
      {task.children.length > 0 && (
        <div className="roadmap-task-children">
          {task.children.map((child) => (
            <RoadmapTaskItem key={child.id} task={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Roadmap 分组组件
 * 用于渲染一组任务（如"正在开发"、"已完成"等分组）
 */
interface RoadmapTaskGroupProps {
  title: string;
  tasks: RoadmapTask[];
  icon?: React.ReactNode;
  className?: string;
}

export function RoadmapTaskGroup({
  title,
  tasks,
  icon,
  className = "",
}: RoadmapTaskGroupProps) {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <section className={`roadmap-task-group ${className}`}>
      <div className="flex items-center gap-3 mb-4 pb-2 border-b border-fd-border">
        {icon && <div className="text-fd-primary">{icon}</div>}
        <h2 className="text-2xl font-bold text-fd-foreground">{title}</h2>
        <span className="text-sm text-fd-muted-foreground">
          ({tasks.length} 项)
        </span>
      </div>

      <div className="space-y-1">
        {tasks.map((task) => (
          <RoadmapTaskItem key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
