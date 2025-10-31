import React, { useState } from 'react';
import { KanbanColumn as KanbanColumnType, KanbanTask } from './KanbanBoard.types';
import { KanbanCard } from './KanbanCard';
import { getTaskCount, isAtLimit, isApproachingLimit, getWipWarningColor } from '../../utils/column.utils';
import { clsx } from 'clsx';

interface KanbanColumnProps {
  column: KanbanColumnType;
  tasks: Record<string, KanbanTask>;
  onEditTask?: (task: KanbanTask) => void;
  onDeleteTask?: (taskId: string) => void;
  onAddTask?: () => void;
  isOverColumn?: boolean;
  onDrop?: (e: React.DragEvent, columnId: string) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragEnter?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  isTaskDragging?: (taskId: string) => boolean;
  onTaskDragStart?: (e: React.DragEvent) => void;
  onTaskDragEnd?: () => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  tasks,
  onEditTask,
  onDeleteTask,
  onAddTask,
  isOverColumn = false,
  onDrop,
  onDragOver,
  onDragEnter,
  onDragLeave,
  isTaskDragging,
  onTaskDragStart,
  onTaskDragEnd,
}) => {
  const [isDragOverColumn, setIsDragOverColumn] = useState(false);
  const taskCount = getTaskCount(column.taskIds);
  const isAtWipLimit = isAtLimit(column.taskIds, column.maxTasks);
  const isApproachingWipLimit = isApproachingLimit(column.taskIds, column.maxTasks);
  const wipWarningClass = getWipWarningColor(column.taskIds, column.maxTasks);

  const columnTasks = column.taskIds
    .map((id) => tasks[id])
    .filter((task): task is KanbanTask => task !== undefined);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOverColumn(true);
    onDragOver?.(e);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setIsDragOverColumn(false);
      onDragLeave?.(e);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOverColumn(false);
    onDrop?.(e, column.id);
  };

  const showDropIndicator = isOverColumn || isDragOverColumn;

  return (
    <div
      className={clsx(
        'flex flex-col w-80 bg-neutral-50 rounded-lg border-2 border-transparent',
        {
          'border-primary-400 bg-primary-50': showDropIndicator,
        }
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="region"
      aria-label={`${column.title} column. ${taskCount} tasks.`}
    >
      {/* Column Header */}
      <div className="sticky top-0 bg-white border-b border-neutral-200 px-4 py-3 rounded-t-lg z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-neutral-900">
            {column.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600">
              {taskCount}
            </span>
            {column.maxTasks && (
              <span className={clsx('text-xs px-2 py-0.5 rounded font-medium', wipWarningClass)}>
                / {column.maxTasks}
              </span>
            )}
          </div>
        </div>
        
        {/* WIP Warning */}
        {isApproachingWipLimit && !isAtWipLimit && (
          <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
            Approaching WIP limit
          </div>
        )}
        {isAtWipLimit && (
          <div className="text-xs text-error-600 bg-error-50 px-2 py-1 rounded">
            WIP limit reached
          </div>
        )}
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
        {columnTasks.length === 0 ? (
          <div className="text-center text-neutral-400 text-sm py-8">
            No tasks yet
          </div>
        ) : (
          columnTasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              isDragging={isTaskDragging?.(task.id) || false}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onDragStart={onTaskDragStart}
              onDragEnd={onTaskDragEnd}
            />
          ))
        )}
      </div>

      {/* Add Task Button */}
      <div className="px-4 pb-4">
        <button
          onClick={onAddTask}
          className="w-full py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label={`Add task to ${column.title}`}
        >
          + Add Task
        </button>
      </div>
    </div>
  );
};

