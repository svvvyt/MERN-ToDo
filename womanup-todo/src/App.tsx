import { Routes, Route, Navigate } from 'react-router-dom';
import { AddItem, TodoItem, TodoList } from './pages';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<TodoList />} />
        <Route path="/tasks/:id" element={<TodoItem />} />
        <Route path="/tasks/:id/edit" element={<AddItem />} />
        <Route path="/add-task" element={<AddItem />} />
      </Routes>
    </div>
  );
}
