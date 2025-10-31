import { useState, useCallback } from 'react';

interface DragState {
  isDragging: boolean;
  draggedId: string | null;
  draggedFromColumn: string | null;
  draggedFromIndex: number | null;
  dropTargetColumn: string | null;
  dropTargetIndex: number | null;
}

export const useDragAndDrop = () => {
  const [state, setState] = useState<DragState>({
    isDragging: false,
    draggedId: null,
    draggedFromColumn: null,
    draggedFromIndex: null,
    dropTargetColumn: null,
    dropTargetIndex: null,
  });

  const handleDragStart = useCallback((
    id: string,
    fromColumn: string,
    fromIndex: number
  ) => {
    setState({
      isDragging: true,
      draggedId: id,
      draggedFromColumn: fromColumn,
      draggedFromIndex: fromIndex,
      dropTargetColumn: null,
      dropTargetIndex: null,
    });
  }, []);

  const handleDragOver = useCallback((
    targetColumn: string,
    targetIndex: number
  ) => {
    setState((prev) => ({
      ...prev,
      dropTargetColumn: targetColumn,
      dropTargetIndex: targetIndex,
    }));
  }, []);

  const handleDragEnd = useCallback(() => {
    setState({
      isDragging: false,
      draggedId: null,
      draggedFromColumn: null,
      draggedFromIndex: null,
      dropTargetColumn: null,
      dropTargetIndex: null,
    });
  }, []);

  return {
    ...state,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

