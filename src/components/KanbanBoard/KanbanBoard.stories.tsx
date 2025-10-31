import type { Meta, StoryObj } from '@storybook/react';
import { KanbanBoard } from './KanbanBoard';
import { KanbanColumn, KanbanTask } from './KanbanBoard.types';

const meta: Meta<typeof KanbanBoard> = {
  title: 'Kanban/Board',
  component: KanbanBoard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

// Sample Data
const sampleColumns: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: ['task-1', 'task-2'], maxTasks: 10 },
  { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: ['task-3'], maxTasks: 5 },
  { id: 'review', title: 'Review', color: '#f59e0b', taskIds: [], maxTasks: 3 },
  { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-4', 'task-5'] },
];

const sampleTasks: Record<string, KanbanTask> = {
  'task-1': {
    id: 'task-1',
    title: 'Implement drag and drop',
    description: 'Add D&D functionality to kanban cards',
    status: 'todo',
    priority: 'high',
    assignee: 'John Doe',
    tags: ['frontend', 'feature'],
    createdAt: new Date(2024, 0, 10),
    dueDate: new Date(2024, 0, 20),
  },
  'task-2': {
    id: 'task-2',
    title: 'Design task modal',
    description: 'Create modal for editing task details',
    status: 'todo',
    priority: 'medium',
    assignee: 'Jane Smith',
    tags: ['design', 'ui'],
    createdAt: new Date(2024, 0, 11),
    dueDate: new Date(2024, 0, 18),
  },
  'task-3': {
    id: 'task-3',
    title: 'Setup TypeScript',
    status: 'in-progress',
    priority: 'urgent',
    assignee: 'John Doe',
    tags: ['setup', 'typescript'],
    createdAt: new Date(2024, 0, 9),
  },
  'task-4': {
    id: 'task-4',
    title: 'Create project structure',
    description: 'Setup folder structure and initial files',
    status: 'done',
    priority: 'low',
    assignee: 'Jane Smith',
    tags: ['setup'],
    createdAt: new Date(2024, 0, 8),
    dueDate: new Date(2024, 0, 9),
  },
  'task-5': {
    id: 'task-5',
    title: 'Install dependencies',
    status: 'done',
    priority: 'low',
    assignee: 'John Doe',
    tags: ['setup'],
    createdAt: new Date(2024, 0, 8),
  },
};

const emptyColumns: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: [] },
  { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: [] },
  { id: 'review', title: 'Review', color: '#f59e0b', taskIds: [] },
  { id: 'done', title: 'Done', color: '#10b981', taskIds: [] },
];

export const Default: Story = {
  args: {
    columns: sampleColumns,
    tasks: sampleTasks,
    onTaskMove: (taskId, fromColumn, toColumn, newIndex) => {
      console.log('Move task:', { taskId, fromColumn, toColumn, newIndex });
    },
    onTaskCreate: (columnId, task) => {
      console.log('Create task:', { columnId, task });
    },
    onTaskUpdate: (taskId, updates) => {
      console.log('Update task:', { taskId, updates });
    },
    onTaskDelete: (taskId) => {
      console.log('Delete task:', taskId);
    },
  },
};

export const Empty: Story = {
  args: {
    columns: emptyColumns,
    tasks: {},
    onTaskMove: () => {},
    onTaskCreate: () => {},
    onTaskUpdate: () => {},
    onTaskDelete: () => {},
  },
};

// Large dataset with 30+ tasks
const largeTaskIds: string[] = [];
const largeTasks: Record<string, KanbanTask> = {};
const priorities: ('low' | 'medium' | 'high' | 'urgent')[] = ['low', 'medium', 'high', 'urgent'];

for (let i = 1; i <= 35; i++) {
  const taskId = `large-task-${i}`;
  largeTaskIds.push(taskId);
  largeTasks[taskId] = {
    id: taskId,
    title: `Task ${i}: Implement feature ${i}`,
    description: `This is a detailed description for task ${i} in the large dataset`,
    status: i <= 8 ? 'todo' : i <= 15 ? 'in-progress' : i <= 22 ? 'review' : 'done',
    priority: priorities[i % 4],
    assignee: i % 2 === 0 ? 'John Doe' : 'Jane Smith',
    tags: ['feature', 'backend', 'frontend'].filter((_, idx) => i % (idx + 1) === 0),
    createdAt: new Date(2024, 0, i % 30),
    dueDate: new Date(2024, 1, i % 28),
  };
}

const largeColumns: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: largeTaskIds.filter((_, i) => i < 8) },
  { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: largeTaskIds.filter((_, i) => i >= 8 && i < 15) },
  { id: 'review', title: 'Review', color: '#f59e0b', taskIds: largeTaskIds.filter((_, i) => i >= 15 && i < 22) },
  { id: 'done', title: 'Done', color: '#10b981', taskIds: largeTaskIds.filter((_, i) => i >= 22) },
];

export const WithManyTasks: Story = {
  args: {
    columns: largeColumns,
    tasks: largeTasks,
    onTaskMove: () => {},
    onTaskCreate: () => {},
    onTaskUpdate: () => {},
    onTaskDelete: () => {},
  },
};

// Different priorities showcase
const priorityColumns: KanbanColumn[] = [
  { id: 'low', title: 'Low Priority', color: '#3b82f6', taskIds: ['p-low-1', 'p-low-2'] },
  { id: 'medium', title: 'Medium Priority', color: '#f59e0b', taskIds: ['p-medium-1', 'p-medium-2'] },
  { id: 'high', title: 'High Priority', color: '#f97316', taskIds: ['p-high-1', 'p-high-2'] },
  { id: 'urgent', title: 'Urgent', color: '#ef4444', taskIds: ['p-urgent-1', 'p-urgent-2'] },
];

const priorityTasks: Record<string, KanbanTask> = {
  'p-low-1': {
    id: 'p-low-1',
    title: 'Low Priority Task 1',
    status: 'low',
    priority: 'low',
    assignee: 'John Doe',
    createdAt: new Date(2024, 0, 15),
  },
  'p-low-2': {
    id: 'p-low-2',
    title: 'Low Priority Task 2',
    status: 'low',
    priority: 'low',
    assignee: 'Jane Smith',
    createdAt: new Date(2024, 0, 16),
  },
  'p-medium-1': {
    id: 'p-medium-1',
    title: 'Medium Priority Task 1',
    status: 'medium',
    priority: 'medium',
    assignee: 'John Doe',
    createdAt: new Date(2024, 0, 15),
  },
  'p-medium-2': {
    id: 'p-medium-2',
    title: 'Medium Priority Task 2',
    status: 'medium',
    priority: 'medium',
    assignee: 'Jane Smith',
    createdAt: new Date(2024, 0, 16),
  },
  'p-high-1': {
    id: 'p-high-1',
    title: 'High Priority Task 1',
    status: 'high',
    priority: 'high',
    assignee: 'John Doe',
    createdAt: new Date(2024, 0, 15),
  },
  'p-high-2': {
    id: 'p-high-2',
    title: 'High Priority Task 2',
    status: 'high',
    priority: 'high',
    assignee: 'Jane Smith',
    createdAt: new Date(2024, 0, 16),
  },
  'p-urgent-1': {
    id: 'p-urgent-1',
    title: 'Urgent Task 1',
    status: 'urgent',
    priority: 'urgent',
    assignee: 'John Doe',
    createdAt: new Date(2024, 0, 15),
  },
  'p-urgent-2': {
    id: 'p-urgent-2',
    title: 'Urgent Task 2',
    status: 'urgent',
    priority: 'urgent',
    assignee: 'Jane Smith',
    createdAt: new Date(2024, 0, 16),
  },
};

export const DifferentPriorities: Story = {
  args: {
    columns: priorityColumns,
    tasks: priorityTasks,
    onTaskMove: () => {},
    onTaskCreate: () => {},
    onTaskUpdate: () => {},
    onTaskDelete: () => {},
  },
};

export const MobileView: Story = {
  args: {
    columns: sampleColumns,
    tasks: sampleTasks,
    onTaskMove: () => {},
    onTaskCreate: () => {},
    onTaskUpdate: () => {},
    onTaskDelete: () => {},
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

