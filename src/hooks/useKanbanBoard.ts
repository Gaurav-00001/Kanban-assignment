import { useState, useCallback } from 'react';
import { KanbanColumn, KanbanTask } from '../components/KanbanBoard/KanbanBoard.types';
import { reorderTasks, moveTaskBetweenColumns, canMoveToColumn } from '../utils/task.utils';

export const useKanbanBoard = (
  initialColumns: KanbanColumn[],
  initialTasks: Record<string, KanbanTask>
) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [tasks, setTasks] = useState<Record<string, KanbanTask>>(initialTasks);

  const moveTask = useCallback((
    taskId: string,
    fromColumn: string,
    toColumn: string,
    newIndex: number
  ) => {
    const fromColumnData = columns.find((col) => col.id === fromColumn);
    const toColumnData = columns.find((col) => col.id === toColumn);

    if (!fromColumnData || !toColumnData) return;

    // Check WIP limit
    if (!canMoveToColumn(toColumnData)) {
      console.warn(`Cannot move task: WIP limit reached for column ${toColumn}`);
      return;
    }

    const fromIndex = fromColumnData.taskIds.indexOf(taskId);
    
    if (fromIndex === -1) return;

    setColumns((prev) => {
      const newColumns = [...prev];
      const fromColIdx = newColumns.findIndex((col) => col.id === fromColumn);
      const toColIdx = newColumns.findIndex((col) => col.id === toColumn);

      if (fromColumn === toColumn) {
        // Same column reordering
        newColumns[fromColIdx] = {
          ...newColumns[fromColIdx],
          taskIds: reorderTasks(newColumns[fromColIdx].taskIds, fromIndex, newIndex),
        };
      } else {
        // Different column
        const { source, destination } = moveTaskBetweenColumns(
          newColumns[fromColIdx].taskIds,
          newColumns[toColIdx].taskIds,
          fromIndex,
          newIndex
        );
        newColumns[fromColIdx] = { ...newColumns[fromColIdx], taskIds: source };
        newColumns[toColIdx] = { ...newColumns[toColIdx], taskIds: destination };
      }

      return newColumns;
    });

    // Update task status
    if (fromColumn !== toColumn) {
      setTasks((prev) => ({
        ...prev,
        [taskId]: { ...prev[taskId], status: toColumn },
      }));
    }
  }, [columns]);

  const createTask = useCallback((columnId: string, task: KanbanTask) => {
    setTasks((prev) => ({ ...prev, [task.id]: task }));
    
    setColumns((prev) => {
      const newColumns = [...prev];
      const colIdx = newColumns.findIndex((col) => col.id === columnId);
      if (colIdx !== -1) {
        newColumns[colIdx] = {
          ...newColumns[colIdx],
          taskIds: [...newColumns[colIdx].taskIds, task.id],
        };
      }
      return newColumns;
    });
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<KanbanTask>) => {
    setTasks((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], ...updates },
    }));
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => {
      const { [taskId]: deleted, ...rest } = prev;
      return rest;
    });

    setColumns((prev) => {
      const newColumns = prev.map((col) => ({
        ...col,
        taskIds: col.taskIds.filter((id) => id !== taskId),
      }));
      return newColumns;
    });
  }, []);

  return {
    columns,
    tasks,
    moveTask,
    createTask,
    updateTask,
    deleteTask,
  };
};

