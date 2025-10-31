import { KanbanBoard } from './components/KanbanBoard/KanbanBoard';
import { useKanbanBoard } from './hooks/useKanbanBoard';

const initialColumns = [
  { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: ['task-1', 'task-2'], maxTasks: 10 },
  { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: ['task-3'], maxTasks: 5 },
  { id: 'review', title: 'Review', color: '#f59e0b', taskIds: [], maxTasks: 3 },
  { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-4', 'task-5'] },
];

const initialTasks = {
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

function App() {
  const { columns, tasks, moveTask, createTask, updateTask, deleteTask } = useKanbanBoard(
    initialColumns,
    initialTasks
  );

  return (
    <KanbanBoard
      columns={columns}
      tasks={tasks}
      onTaskMove={moveTask}
      onTaskCreate={createTask}
      onTaskUpdate={updateTask}
      onTaskDelete={deleteTask}
    />
  );
}

export default App;
