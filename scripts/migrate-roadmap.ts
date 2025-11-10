/**
 * Roadmap 数据迁移脚本
 *
 * 将多个 .mdx 文件迁移为单个 checkbox 格式的 roadmap.mdx
 *
 * 使用方式:
 *   npx tsx scripts/migrate-roadmap.ts
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

interface RoadmapItem {
  title: string;
  description?: string;
  status: 'working-on' | 'backlog' | 'shipped';
  version?: string;
  date?: string;
  docsUrl?: string;
  fileName: string;
}

/**
 * 读取所有 roadmap .mdx 文件
 */
function loadRoadmapItems(): RoadmapItem[] {
  const roadmapDir = join(process.cwd(), 'content/roadmap');
  const files = readdirSync(roadmapDir).filter(f => f.endsWith('.mdx'));

  const items: RoadmapItem[] = [];

  files.forEach(fileName => {
    const filePath = join(roadmapDir, fileName);
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    items.push({
      title: data.title || '未命名任务',
      description: data.description,
      status: data.status || 'backlog',
      version: data.version,
      date: data.date,
      docsUrl: data.docsUrl,
      fileName,
    });
  });

  return items;
}

/**
 * 按状态分组
 */
function groupByStatus(items: RoadmapItem[]): Record<string, RoadmapItem[]> {
  const groups: Record<string, RoadmapItem[]> = {
    'working-on': [],
    'backlog': [],
    'shipped': [],
  };

  items.forEach(item => {
    if (groups[item.status]) {
      groups[item.status].push(item);
    }
  });

  return groups;
}

/**
 * 生成 checkbox 格式的任务行
 */
function generateCheckboxLine(item: RoadmapItem): string {
  const checkbox = item.status === 'shipped' ? '[x]' : '[ ]';

  // 标题和链接
  let titlePart = '';
  if (item.docsUrl) {
    titlePart = `[${item.title}](${item.docsUrl})`;
  } else {
    titlePart = item.title;
  }

  // 元数据
  const metaParts: string[] = [];

  // 开始日期（未完成任务）或完成日期（已完成任务）
  if (item.date) {
    if (item.status === 'shipped') {
      metaParts.push(`[completion:: ${item.date}]`);
    } else {
      metaParts.push(`[start:: ${item.date}]`);
    }
  }

  // 版本号
  if (item.version) {
    metaParts.push(`[version:: ${item.version}]`);
  }

  const metaStr = metaParts.length > 0 ? ' ' + metaParts.join(' ') : '';

  // 描述（作为下一行缩进的内容）
  const descLine = item.description
    ? `\n  ${item.description}`
    : '';

  return `- ${checkbox} ${titlePart}${metaStr}${descLine}`;
}

/**
 * 生成完整的 roadmap.mdx 内容
 */
function generateRoadmapContent(groups: Record<string, RoadmapItem[]>): string {
  const frontmatter = `---
title: "Roadmap"
description: "Task Genius development roadmap - Track features in development, backlog, and shipped releases"
---

# Task Genius Roadmap

欢迎查看 Task Genius 的开发路线图。这里展示了我们正在开发、计划中以及已发布的功能。

`;

  // 正在开发
  const workingOnSection = groups['working-on'].length > 0
    ? `## 🚧 正在开发

${groups['working-on'].map(generateCheckboxLine).join('\n\n')}

`
    : '';

  // 待办事项
  const backlogSection = groups['backlog'].length > 0
    ? `## 📋 待办事项

${groups['backlog'].map(generateCheckboxLine).join('\n\n')}

`
    : '';

  // 已发布功能
  const shippedSection = groups['shipped'].length > 0
    ? `## ✅ 已发布功能

${groups['shipped']
  .sort((a, b) => {
    // 按日期倒序排序（最新的在前）
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })
  .map(generateCheckboxLine)
  .join('\n\n')}
`
    : '';

  return frontmatter + workingOnSection + backlogSection + shippedSection;
}

/**
 * 主函数
 */
function main() {
  console.log('🚀 开始迁移 roadmap 数据...\n');

  // 1. 读取所有 roadmap 项
  console.log('📖 读取现有 .mdx 文件...');
  const items = loadRoadmapItems();
  console.log(`   找到 ${items.length} 个 roadmap 项\n`);

  // 2. 按状态分组
  console.log('📊 按状态分组...');
  const groups = groupByStatus(items);
  console.log(`   - 正在开发: ${groups['working-on'].length} 项`);
  console.log(`   - 待办事项: ${groups['backlog'].length} 项`);
  console.log(`   - 已发布: ${groups['shipped'].length} 项\n`);

  // 3. 生成 roadmap.mdx
  console.log('✍️  生成 roadmap.mdx...');
  const content = generateRoadmapContent(groups);

  // 4. 写入文件
  const outputPath = join(process.cwd(), 'content/roadmap.mdx');
  writeFileSync(outputPath, content, 'utf-8');
  console.log(`   ✅ 已写入: ${outputPath}\n`);

  // 5. 统计信息
  console.log('📈 迁移完成统计:');
  console.log(`   - 总任务数: ${items.length}`);
  console.log(`   - 已完成: ${groups['shipped'].length} (${Math.round(groups['shipped'].length / items.length * 100)}%)`);
  console.log(`   - 进行中: ${groups['working-on'].length}`);
  console.log(`   - 待办: ${groups['backlog'].length}\n`);

  console.log('✨ 迁移完成！');
  console.log('💡 提示: 旧的 .mdx 文件仍保留在 content/roadmap/ 目录下');
  console.log('   如需备份，请手动移动到其他位置\n');
}

// 执行
main();
