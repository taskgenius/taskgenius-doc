/**
 * Roadmap Checkbox 任务解析器
 *
 * 用于解析 Markdown checkbox 格式的 roadmap 任务，支持：
 * - 任务完成状态：- [ ] 或 - [x]
 * - 分类标题：- Text（普通列表项，不含 checkbox）
 * - 链接格式：[文本](url)
 * - 元数据：[start:: YYYY-MM-DD], [completion:: YYYY-MM-DD], [version:: x.x.x]
 * - 多行描述：任务下方缩进的文本
 * - 嵌套任务：通过缩进表示父子关系
 *
 * 示例格式：
 * ```markdown
 * - View Related
 *     - [x] [Multi-select](/docs/bulk-operations) [completion:: 2025-10-20] [version:: 9.9.0]
 *       Multi-select tasks to update them at once
 *     - [ ] Another task
 * ```
 */

/**
 * Roadmap 任务接口
 */
export interface RoadmapTask {
  id: string;                    // 唯一标识
  title: string;                 // 任务标题
  completed: boolean;            // 是否完成
  isCategory?: boolean;          // 是否为分类标题（普通列表项）
  link?: string;                 // 链接 URL
  start?: string;                // 开始日期 [start:: YYYY-MM-DD]
  completion?: string;           // 完成日期 [completion:: YYYY-MM-DD]
  version?: string;              // 版本号 [version:: x.x.x]
  description?: string;          // 描述（可选）
  children: RoadmapTask[];       // 子任务
  level: number;                 // 缩进层级（0 为根级）
}

/**
 * 解析普通列表项作为分类标题
 * @param line - 列表项文本
 * @param lineNumber - 行号（用于生成唯一 ID）
 * @returns 解析后的分类对象（部分）
 */
function parseCategoryLine(line: string, lineNumber: number): Partial<RoadmapTask> | null {
  // 匹配普通列表项格式：- Text（不包含 checkbox）
  // 使用否定前瞻确保 - 后面不是 [
  const categoryMatch = line.match(/^(\s*)-\s+(?!\[)(.+)$/);
  if (!categoryMatch) {
    return null;
  }

  const [, indent, title] = categoryMatch;
  const level = Math.floor(indent.length / 2); // 2 空格 = 1 层级

  return {
    id: `category-${lineNumber}`,
    title: title.trim(),
    completed: false,
    isCategory: true,
    level,
    children: [],
  };
}

/**
 * 解析单行任务
 * @param line - 任务行文本
 * @param lineNumber - 行号（用于生成唯一 ID）
 * @returns 解析后的任务对象（部分）
 */
function parseTaskLine(line: string, lineNumber: number): Partial<RoadmapTask> | null {
  // 匹配 checkbox 格式：- [ ] 或 - [x]
  const checkboxMatch = line.match(/^(\s*)-\s*\[([ xX])\]\s*(.*)$/);
  if (!checkboxMatch) {
    return null;
  }

  const [, indent, checkmark, content] = checkboxMatch;
  const level = Math.floor(indent.length / 2); // 2 空格 = 1 层级
  const completed = checkmark.toLowerCase() === 'x';

  let remainingContent = content.trim();
  let title = '';
  let link: string | undefined;
  let start: string | undefined;
  let completion: string | undefined;
  let version: string | undefined;

  // 提取链接：[文本](url)
  const linkMatch = remainingContent.match(/^\[([^\]]+)\]\(([^)]+)\)/);
  if (linkMatch) {
    title = linkMatch[1];
    link = linkMatch[2];
    remainingContent = remainingContent.slice(linkMatch[0].length).trim();
  } else {
    // 没有链接，提取普通文本（到第一个 [ 或行尾）
    const textMatch = remainingContent.match(/^([^\[]+)/);
    if (textMatch) {
      title = textMatch[1].trim();
      remainingContent = remainingContent.slice(textMatch[0].length).trim();
    }
  }

  // 提取元数据：[key:: value]
  const metadataPattern = /\[(\w+)::\s*([^\]]+)\]/g;
  let metaMatch;
  while ((metaMatch = metadataPattern.exec(remainingContent)) !== null) {
    const [, key, value] = metaMatch;
    const normalizedKey = key.toLowerCase();

    if (normalizedKey === 'start') {
      start = value.trim();
    } else if (normalizedKey === 'completion') {
      completion = value.trim();
    } else if (normalizedKey === 'version') {
      version = value.trim();
    }
  }

  // 移除所有元数据标记，剩余部分作为描述
  const description = remainingContent
    .replace(/\[(\w+)::\s*([^\]]+)\]/g, '')
    .trim();

  return {
    id: `task-${lineNumber}`,
    title,
    completed,
    link,
    start,
    completion,
    version,
    description: description || undefined,
    level,
    children: [],
  };
}

/**
 * 构建任务树形结构
 * @param lines - Markdown 内容行数组
 * @returns 根级任务数组
 */
function buildTaskTree(lines: string[]): RoadmapTask[] {
  const root: RoadmapTask[] = [];
  const stack: RoadmapTask[] = []; // 用于维护当前层级的父任务栈
  let lastTask: RoadmapTask | null = null; // 跟踪最后一个处理的任务

  lines.forEach((line, index) => {
    // 先尝试解析为任务（checkbox）
    let parsed = parseTaskLine(line, index);

    // 如果不是任务，尝试解析为分类（普通列表项）
    if (!parsed) {
      parsed = parseCategoryLine(line, index);
    }

    if (!parsed) {
      // 检查是否是描述行（缩进的纯文本）
      if (lastTask && line.trim() && /^\s+\S/.test(line)) {
        const indent = line.match(/^(\s*)/)?.[1].length || 0;
        const taskIndent = lastTask.level * 2;

        // 如果缩进大于任务缩进，认为是该任务的描述
        if (indent > taskIndent) {
          const descriptionText = line.trim();
          if (lastTask.description) {
            lastTask.description += '\n' + descriptionText;
          } else {
            lastTask.description = descriptionText;
          }
        }
      }
      return; // 跳过非任务行
    }

    const task = parsed as RoadmapTask;
    lastTask = task; // 更新最后处理的任务

    // 找到当前任务的父任务
    while (stack.length > 0 && stack[stack.length - 1].level >= task.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      // 根级任务
      root.push(task);
    } else {
      // 添加到父任务的子任务列表
      stack[stack.length - 1].children.push(task);
    }

    // 将当前任务入栈，作为后续任务的潜在父任务
    stack.push(task);
  });

  return root;
}

/**
 * 递归排序任务：已完成任务移到底部（分类标题不参与排序）
 * @param tasks - 任务数组
 * @returns 排序后的任务数组
 */
function sortTasks(tasks: RoadmapTask[]): RoadmapTask[] {
  // 先递归处理子任务
  const processedTasks = tasks.map(task => ({
    ...task,
    children: sortTasks(task.children),
  }));

  // 分离分类和普通任务
  const categories = processedTasks.filter(task => task.isCategory);
  const regularTasks = processedTasks.filter(task => !task.isCategory);

  // 对普通任务进行排序：分离已完成和未完成任务
  const incomplete = regularTasks.filter(task => !task.completed);
  const completed = regularTasks.filter(task => task.completed);

  // 分类保持原位，普通任务按完成状态排序
  // 这里简单处理：分类在前，然后是未完成任务，最后是已完成任务
  return [...categories, ...incomplete, ...completed];
}

/**
 * 解析 Roadmap Markdown 内容
 * @param content - Markdown 内容字符串
 * @returns 排序后的任务树
 */
export function parseRoadmapContent(content: string): RoadmapTask[] {
  const lines = content.split('\n');
  const taskTree = buildTaskTree(lines);
  return sortTasks(taskTree);
}

/**
 * 将任务树扁平化为列表（用于调试或其他用途）
 * @param tasks - 任务树
 * @returns 扁平化的任务列表
 */
export function flattenTasks(tasks: RoadmapTask[]): RoadmapTask[] {
  const result: RoadmapTask[] = [];

  function traverse(taskList: RoadmapTask[]) {
    taskList.forEach(task => {
      result.push(task);
      if (task.children.length > 0) {
        traverse(task.children);
      }
    });
  }

  traverse(tasks);
  return result;
}

/**
 * 统计任务数量（不包含分类标题）
 * @param tasks - 任务树
 * @returns 任务统计信息
 */
export function getTaskStats(tasks: RoadmapTask[]): {
  total: number;
  completed: number;
  incomplete: number;
} {
  const flatTasks = flattenTasks(tasks);
  // 过滤掉分类标题，只统计实际任务
  const actualTasks = flatTasks.filter(t => !t.isCategory);
  const completed = actualTasks.filter(t => t.completed).length;

  return {
    total: actualTasks.length,
    completed,
    incomplete: actualTasks.length - completed,
  };
}
