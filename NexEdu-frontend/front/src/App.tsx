import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContent from './components/Main/MainContent';
import AddTask from './pages/AddTask/AddTask';
import TaskList from './pages/TaskList/TaskList';
import PostListPage from './pages/Posts/PostListPage';
import PostPage from './pages/Posts/PostPage';
import { mockPosts } from './components/data/mockPosts';
import './App.css';

interface Task {
  id: number;
  name: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskName: string) => {
    setTasks([...tasks, { id: tasks.length + 1, name: taskName }]);
  };

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <MainContent>
          <Routes>
            {/* Rota padrão - redireciona para posts */}
            <Route path="/" element={<Navigate to="/posts" replace />} />
            
            {/* Rotas dos posts */}
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/posts/:id" element={<PostPage posts={mockPosts} />} />
            
            {/* Rotas existentes das tarefas */}
            <Route path="/tasks" element={
              <>
                <h1>Conteúdos</h1>
                <AddTask onAddTask={addTask} />
                <TaskList tasks={tasks} onRemoveTask={removeTask} />
              </>
            } />
          </Routes>
        </MainContent>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
