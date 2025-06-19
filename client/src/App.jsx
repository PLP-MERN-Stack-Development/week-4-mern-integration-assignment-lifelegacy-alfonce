import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add a default route or home page */}
        <Route path="/" element={<div className="p-4">Welcome to the Blog!</div>} />
      </Routes>
    </div>
  );
}

export default App;
