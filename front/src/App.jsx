import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import ArticlesList from './ArticlesList';
import Register from './Register';
import Login from './Login';
import './App.css';

function Home() {
  return (
    <div>
      <h1>Accueil</h1>
      <nav>
        <Link to="/login">Connexion</Link>
        <br />
        <Link to="/register">Inscription</Link>
        <br />
        <Link to="/articles">Articles</Link>
      </nav>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/articles"
            element={
              <ProtectedRoute>
                <ArticlesList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
