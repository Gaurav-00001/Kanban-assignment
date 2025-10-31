import { KanbanTask } from '../components/KanbanBoard/KanbanBoard.types';

/**
 * Checks if a task is overdue
 */
export const isOverdue = (dueDate: Date): boolean => {
  return new Date() > dueDate;
};

/**
 * Gets initials from a name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Calculates priority color classes
 */
export const getPriorityColor = (priority: string): string => {
  const colors = {
    low: 'bg-blue-100 text-blue-700 border-l-4 border-blue-500',
    medium: 'bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500',
    high: 'bg-orange-100 text-orange-700 border-l-4 border-orange-500',
    urgent: 'bg-red-100 text-red-700 border-l-4 border-red-500',
  };
  return colors[priority as keyof typeof colors] || colors.medium;
};

/**
 * Formats a date for display
 */
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

/**
 * Reorders tasks after drag and drop within same column
 */
export const reorderTasks = (
  tasks: string[],
  startIndex: number,
  endIndex: number
): string[] => {
  const result = Array.from(tasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves task between columns
 */
export const moveTaskBetweenColumns = (
  sourceColumn: string[],
  destColumn: string[],
  sourceIndex: number,
  destIndex: number
): { source: string[]; destination: string[] } => {
  const sourceClone = Array.from(sourceColumn);
  const destClone = Array.from(destColumn);
  const [removed] = sourceClone.splice(sourceIndex, 1);
  destClone.splice(destIndex, 0, removed);
  return {
    source: sourceClone,
    destination: destClone,
  };
};

/**
 * Creates a new task with default values
 */
export const createNewTask = (columnId: string, title: string = 'New Task'): KanbanTask => {
  return {
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title,
    status: columnId,
    createdAt: new Date(),
    priority: 'medium',
    tags: [],
  };
};

/**
 * Validates if a task can be moved to a column (WIP limit check)
 */
export const canMoveToColumn = (column: { maxTasks?: number; taskIds: string[] }): boolean => {
  if (!column.maxTasks) return true;
  return column.taskIds.length < column.maxTasks;
};

