import { Route,Routes } from 'react-router';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';
import AuthGuard from './components/ui/AuthGuard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />}/>
      <Route path="/" element={<AuthGuard><HomePage /></AuthGuard>} />
      <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
    </Routes>
  );
}

export default App;
