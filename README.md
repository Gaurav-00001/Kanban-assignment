# Kanban Board Component

A production-ready, fully accessible Kanban Board component built with React, TypeScript, and Tailwind CSS.

## 🚀 Live Storybook

[Your Deployed Storybook URL - Coming Soon]

## 📦 Installation

```bash
npm install
npm run storybook
```

## 🏗️ Architecture

This Kanban Board component follows enterprise-grade architecture patterns:

- **Component-based design** with primitives, hooks, and utilities
- **Type-safe development** with strict TypeScript
- **Accessible by default** with WCAG 2.1 AA compliance
- **Performance optimized** with virtualization support
- **Fully documented** with comprehensive Storybook stories

## ✨ Features

- [x] Drag-and-drop tasks between columns
- [x] Task creation/editing modal
- [x] Priority indicators (Low, Medium, High, Urgent)
- [x] Task assignees with avatar initials
- [x] Tag management
- [x] Due date tracking with overdue warnings
- [x] WIP limits with visual warnings
- [x] Responsive design (mobile, tablet, desktop)
- [x] Keyboard accessibility
- [x] ARIA labels and semantic HTML
- [x] Custom Tailwind design system

## 📚 Storybook Stories

- **Default** - Standard board with 4 columns and sample tasks
- **Empty** - Empty board state demonstration
- **With Many Tasks** - Board with 35+ tasks to test performance
- **Different Priorities** - Showcase all priority levels
- **Mobile View** - Responsive layout demonstration

## 🛠️ Technologies

- **React** - Component framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Next-generation build tool
- **Storybook** - Component documentation and testing
- **clsx** - Conditional class management

## 📁 Project Structure

```
kanban-component/
├── src/
│   ├── components/
│   │   └── KanbanBoard/
│   │       ├── KanbanBoard.tsx
│   │       ├── KanbanBoard.stories.tsx
│   │       ├── KanbanBoard.types.ts
│   │       ├── KanbanColumn.tsx
│   │       ├── KanbanCard.tsx
│   │       ├── TaskModal.tsx
│   │       └── primitives/
│   │           ├── Button.tsx
│   │           ├── Modal.tsx
│   │           └── Avatar.tsx
│   ├── hooks/
│   │   ├── useDragAndDrop.ts
│   │   └── useKanbanBoard.ts
│   ├── utils/
│   │   ├── task.utils.ts
│   │   └── column.utils.ts
│   └── styles/
│       └── globals.css
├── .storybook/
│   ├── main.ts
│   └── preview.ts
└── README.md
```

## 🔧 Development

```bash
# Development server
npm run dev

# Storybook
npm run storybook

# Build
npm run build

# Build Storybook
npm run build-storybook
```

## 📝 License

MIT

## 👤 Contact

[Your email]
