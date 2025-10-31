import React, { useState } from 'react';
import { KanbanTask } from './KanbanBoard.types';
import { isOverdue, formatDate, getPriorityColor } from '../../utils/task.utils';
import { Avatar } from './primitives/Avatar';
import { clsx } from 'clsx';

interface KanbanCardProps {
  task: KanbanTask;
  isDragging?: boolean;
  onEdit?: (task: KanbanTask) => void;
  onDelete?: (taskId: string) => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  draggable?: boolean;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  task,
  isDragging = false,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
  draggable = true,
}) => {
  const [isKeyboardDrag, setIsKeyboardDrag] = useState(false);
  const priorityBorderColor = task.priority ? getPriorityColor(task.priority) : '';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' && draggable) {
      e.preventDefault();
      setIsKeyboardDrag(true);
      // Trigger drag start
      onDragStart?.(e as unknown as React.DragEvent);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onEdit?.(task);
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', task.id);
    onDragStart?.(e);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only trigger edit if not dragging
    if (!isDragging && !isKeyboardDrag) {
      onEdit?.(task);
    }
    setIsKeyboardDrag(false);
  };

  return (
    <div
      className={clsx(
        'bg-white border border-neutral-200 rounded-lg p-3 shadow-card hover:shadow-card-hover transition-all cursor-grab active:cursor-grabbing',
        {
          'opacity-50': isDragging,
          'ring-2 ring-primary-500': isDragging,
        }
      )}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={(e) => {
        setIsKeyboardDrag(false);
        onDragEnd?.(e);
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${task.title}. Status: ${task.status}. Priority: ${task.priority || 'none'}. ${draggable ? 'Press space to grab.' : ''}`}
      onKeyDown={handleKeyDown}
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

