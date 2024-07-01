import { Routes, Route, Link } from 'react-router-dom';
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
      </nav>
    </div>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
