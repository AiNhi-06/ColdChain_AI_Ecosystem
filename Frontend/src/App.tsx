import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import SenderHomePage from './pages/sender/SenderHomePage';
import DriverHomePage from './pages/driver/DriverHomePage';
import EnterpriseHomePage from './pages/enterprise/EnterpriseHomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SenderHomePage />} />
        <Route path="/login" element={<AuthPage initialMode="login" />} />
        <Route path="/register" element={<AuthPage initialMode="register" />} />
        <Route path="/sender" element={<SenderHomePage />} />
        <Route path="/driver" element={<DriverHomePage />} />
        <Route path="/enterprise" element={<EnterpriseHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;