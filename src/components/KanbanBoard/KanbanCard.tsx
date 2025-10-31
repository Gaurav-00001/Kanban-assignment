import React from 'react';
import { KanbanTask } from './KanbanBoard.types';
import { isOverdue, formatDate, getPriorityColor } from '../../utils/task.utils';
import { Avatar } from './primitives/Avatar';
import { clsx } from 'clsx';

interface KanbanCardProps {
  task: KanbanTask;
  isDragging?: boolean;
  onEdit?: (task: KanbanTask) => void;
  onDelete?: (taskId: string) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  task,
  isDragging = false,
  onEdit,
  onDelete,
}) => {
  const priorityBorderColor = task.priority ? getPriorityColor(task.priority) : '';

  return (
    <div
      className={clsx(
        'bg-white border border-neutral-200 rounded-lg p-3 shadow-card hover:shadow-card-hover transition-all cursor-grab active:cursor-grabbing',
        {
          'opacity-50': isDragging,
          'ring-2 ring-primary-500': isDragging,
        }
      )}
      onClick={() => onEdit?.(task)}
      role="button"
      tabIndex={0}
      aria-label={`${task.title}. Status: ${task.status}. Priority: ${task.priority || 'none'}. Press space to grab.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onEdit?.(task);
        }
      }}
    >
      {/* Priority Indicator */}
      {task.priority && (
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-sm text-neutral-900 line-clamp-2 flex-1">
            {task.title}
          </h4>
          <span
            className={clsx(
              'text-xs px-2 py-0.5 rounded ml-2',
              priorityBorderColor
            )}
          >
            {task.priority}
          </span>
        </div>
      )}
      {!task.priority && (
        <h4 className="font-medium text-sm text-neutral-900 line-clamp-2 mb-2">
          {task.title}
        </h4>
      )}

      {/* Description */}
      {task.description && (
        <p className="text-xs text-neutral-600 mb-2 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex gap-1 mb-2 flex-wrap">
          {task.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="text-xs text-neutral-500 px-2 py-0.5">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        {/* Assignee */}
        {task.assignee && <Avatar name={task.assignee} size="sm" />}
        <div className="ml-auto" />
        
        {/* Due Date */}
        {task.dueDate && (
          <div
            className={clsx(
              'text-xs ml-auto',
              isOverdue(task.dueDate) ? 'text-error-600' : 'text-neutral-500'
            )}
          >
            Due: {formatDate(task.dueDate)}
          </div>
        )}
      </div>
    </div>
  );
};

