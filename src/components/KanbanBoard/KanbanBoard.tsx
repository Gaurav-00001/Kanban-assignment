import React, { useState } from 'react';
import { KanbanColumn } from './KanbanColumn';
import { KanbanViewProps, KanbanTask } from './KanbanBoard.types';
import { KanbanCard } from './KanbanCard';
import { TaskModal } from './TaskModal';
import './KanbanBoard.css';

export const KanbanBoard: React.FC<KanbanViewProps> = ({
  columns,
  tasks,
  onTaskMove,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
}) => {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<KanbanTask | undefined>(undefined);
  const [newTaskColumn, setNewTaskColumn] = useState<string>('');

  const handleEditTask = (task: KanbanTask) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      onTaskDelete(taskId);
    }
  };

  const handleAddTask = (columnId: string) => {
    setNewTaskColumn(columnId);
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: KanbanTask) => {
    if (editingTask) {
      onTaskUpdate(task.id, task);
    } else {
      // Create new task
      const taskToCreate = { ...task, status: newTaskColumn || columns[0].id };
      onTaskCreate(taskToCreate.status, taskToCreate);
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData('text/plain');
    const task = tasks[taskId];
    if (task) {
      setDraggedTaskId(taskId);
      setDraggedFromColumn(task.status);
    }
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDraggedFromColumn(null);
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    const taskId = draggedTaskId || e.dataTransfer.getData('text/plain');
    if (!taskId || !draggedFromColumn) return;

    // Get destination column tasks to determine new index
    const destColumn = columns.find((col) => col.id === columnId);
    const newIndex = destColumn?.taskIds.length || 0;

    // Move the task
    onTaskMove(taskId, draggedFromColumn, columnId, newIndex);
    
    setDraggedTaskId(null);
    setDraggedFromColumn(null);
  };

  const handleCardDragStart = (taskId: string) => (e: React.DragEvent) => {
    handleDragStart(e);
  };

  const handleCardDragEnd = () => {
    handleDragEnd();
  };

  return (
    <>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(undefined);
        }}
        task={editingTask}
        columns={columns}
        onSave={handleSaveTask}
      />
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
              onDrop={handleDrop}
              isTaskDragging={(taskId: string) => draggedTaskId === taskId}
              onTaskDragStart={handleDragStart}
              onTaskDragEnd={handleDragEnd}
            />
          ))}
        </div>
      </div>
    </>
  );
};

