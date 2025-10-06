import { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainContent from "./components/Main/MainContent";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { LoginPage } from "./pages/Auth/LoginPage";
import CreatePostPage from "./pages/Posts/CreatePostPage";
import EditPostPage from "./pages/Posts/EditPostPage";
import PostListPage from "./pages/Posts/PostListPage";
import TaskList from "./pages/TaskList/TaskList";

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
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<Navigate to="/posts" replace />} />
              <Route path="/login" element={<LoginPage />} />

              <Route
                path="/posts"
                element={
                  <ProtectedRoute>
                    <PostListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/posts/create"
                element={
                  <ProtectedRoute requireProfessor>
                    <CreatePostPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/posts/:id/edit"
                element={
                  <ProtectedRoute requireProfessor>
                    <EditPostPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/task-list"
                element={<TaskList tasks={tasks} onRemoveTask={removeTask} />}
              />
            </Routes>
          </MainContent>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
