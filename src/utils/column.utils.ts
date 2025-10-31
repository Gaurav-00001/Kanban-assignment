/**
 * Gets the task count for a column
 */
export const getTaskCount = (taskIds: string[]): number => {
  return taskIds.length;
};

/**
 * Checks if a column is approaching its WIP limit
 */
export const isApproachingLimit = (taskIds: string[], maxTasks?: number): boolean => {
  if (!maxTasks) return false;
  return taskIds.length >= maxTasks * 0.8; // 80% threshold
};

/**
 * Checks if a column has reached its WIP limit
 */
export const isAtLimit = (taskIds: string[], maxTasks?: number): boolean => {
  if (!maxTasks) return false;
  return taskIds.length >= maxTasks;
};

/**
 * Gets WIP limit warning color
 */
export const getWipWarningColor = (taskIds: string[], maxTasks?: number): string => {
  if (!maxTasks) return '';
  const percentage = taskIds.length / maxTasks;
  if (percentage >= 1) return 'text-red-600 bg-red-50';
  if (percentage >= 0.8) return 'text-orange-600 bg-orange-50';
  return '';
};

