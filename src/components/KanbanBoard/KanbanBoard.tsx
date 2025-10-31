import React from 'react';
import { KanbanColumn } from './KanbanColumn';
import { KanbanViewProps } from './KanbanBoard.types';
import './KanbanBoard.css';

export const KanbanBoard: React.FC<KanbanViewProps> = ({
  columns,
  tasks,
  onTaskMove,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
}) => {
  const handleEditTask = (task: any) => {
    // TODO: Open modal for editing
    console.log('Edit task:', task);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      onTaskDelete(taskId);
    }
  };

  const handleAddTask = (columnId: string) => {
    // TODO: Open modal for creating new task
    console.log('Add task to column:', columnId);
  };

  return (
    <div className="kanban-board p-6 bg-neutral-100 min-h-screen">
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={() => handleAddTask(column.id)}
          />
        ))}
      </div>
    </div>
  );
};

