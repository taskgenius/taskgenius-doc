---
title: "Tasks with Your Notes: My Journey from Org-mode to Task Genius"
date: "2025-11-10"
author: "Boninall"
description: "A developer's journey from Org-mode to Task Genius, and how to combine notes with tasks"
tags: ["Workflow", "Task Management", "Obsidian"]
---

## The Beginning: My Encounter with Org-mode

Ten years ago, when I first encountered [org-mode (Emacs org-mode)](https://orgmode.org/), I was deeply impressed by its philosophy of managing tasks with plain text. At that time, org-mode was already a "veteran" tool with over 20 years of history, but its elegant plain text management philosophy still amazed me. Everything was plain text - readable, editable, version-controllable, and all the data was stored in plain text files (Just like markdown files in Obsidian).

This simple yet powerful philosophy deeply attracted me. I spent a lot of time to remember hotkeys and syntax of org-mode. (Use `C-c` + `xxx` to capture tasks just like chanted in org-mode.) It was a great experience.

However, ideals are full while reality is harsh. org-mode's overly steep learning curve eventually made me retreat. After struggling for some time, I gave up and turned to more popular Todo software (Used ticktick) at the time. But I always had a wish in my heart: **to find a tool that could accommodate my random thoughts and task ideas while being able to aggregate them all in one place at any time**, balance the flexibility of plain text and the convenience of task management.

## Logseq: A brief but beautiful encounter

It wasn't until early 2020 that I discovered [Logseq (Similar to Roam Research)](https://logseq.com/), a competitor to Obsidian. This software once again caught my eye - it used Markdown to store files while being compatible with org-mode's operation methods and data formats, truly combining the best of both worlds.

I spent several months in between trying to use Logseq for task management while note management with Obsidian. Its design for task management was indeed ingenious.

- **Philosophy Integration**: Combined org-mode's task management philosophy with Dynalist/Workflowy's outline editing.
- **Backlink Editing**: Could directly edit other tasks in projects through backlinks without jumping and searching.
- **Project View**: Displayed all tasks in Project view, and editing didn't require deliberate navigation

But the good times didn't last long. As I used it more deeply (from 202007 to 202104), I found that the data format saved by Logseq became increasingly incompatible with Obsidian. Every operation would generate a lot of data that is not compatible with Obsidian (For example, multiple edited timestamp behind each task), which eventually forced me to abandon it and return to Obsidian to use checkboxes and Markdown to manage tasks in notes.

## The birth of Task Genius

Later, the emergence of plugins like Tasks and Dataview greatly enhanced the task management experience in Obsidian. During this process, I gradually learned Obsidian plugin development and wrote the Task Progress Bar plugin (Yes, it's the predecessor of Task Genius).

In April this year, I made an important decision: **to refactor this Task Progress Bar plugin and completely introduce my own "text combined with tasks" workflow**.

My goals were clear:

- Aggregate tasks like the Tasks plugin, with many predefined views (Inbox, Today, Next 7 Days, etc.)
- Introduce more convenient operation functions on this basis, such as batch moving completed tasks, batch marking, etc.
- Fulfill my original wish: **to be able to write ideas freely in any note and then aggregate and display them**

After nearly half a year of refactoring and development, I'm happy to say that Task Genius has basically met my daily needs. It perfectly accommodates my two working modes:

1. **Daily Note Priority Workflow**: Used in daily life, with tasks scattered across daily notes
2. **Single TODO Page Workflow**: Used at work, concentrated on one todo page

## My Daily Workflow

Perhaps you're still a bit confused about how to use Task Genius. Let me share my actual workflow, hoping to give you some inspiration.

### Daily Task Management Process

1. **Open Fixed Note in Obsidian**
   At the start of each day, I open a fixed task entry point, which could be `00_TODO.md` or the current day's daily note file (e.g., `2025-11-10.md`).

2. **Record Today's Tasks**
   Write down and then use the Task Gutter feature to quickly update tasks' due date for today. I can add dates if needed (though my tasks are generally completed the same day). For project tasks, I directly use `#project/xxxx` tags to associate with projects

3. **View Task Views**

   - Open **Inbox View** to see all unprocessed tasks
   - Switch to **Forecast View** to see all scheduled items for the next 7 days
   - This gives me a clear overview of today's and upcoming tasks

4. **Set Priorities**
   Mark priority levels for some urgent tasks

5. **Start Execution**
   - Return to the note where I just recorded tasks
   - Create sub-list items under tasks (children list items)
   - Create associated notes to record specific thoughts (e.g., technical solutions for developing a plugin feature)
   - Working on the task, and then check off tasks when completed and archive them (Automatially by Task Genius)

### Project Task Management

For project tasks, I adopt a more flexible approach:

- I prefer to **record project items to handle today in daily notes**
- I don't expect to be able to predict in advance what new tasks will arise in projects
- Generally, I only record when I think of project items that need to be handled each day
- This approach better fits the dynamic changes in actual work (Because I usually has tons of (small) tasks to handle every day)

#### Tool (MCP) Integration (Optional)

Combined with MCP (Model Context Protocol) , I can now:

- Write code in the editor on one side
- Check off completed tasks in Task Genius on the other side (via MCP and any AI tools that support MCP)
- Seamlessly integrate coding and task management

## Final Thoughts

From Org-mode to Logseq, then to Obsidian and Task Genius in Obsidian, I think I really love the plain text workflow. It's simple, elegant, and powerful. And I think it's the best way to work with your notes.

Task Genius is not omnipotent, but it has fulfilled my original wish:

- Record ideas and tasks freely in any note
- Automatically aggregate all tasks into a unified view
- Flexibly adapt to different work scenarios
- Maintain the simplicity and elegance of plain text workflow (Thanks to Obsidian)

Good luck!
