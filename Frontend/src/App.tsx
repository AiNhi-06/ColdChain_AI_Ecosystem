import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import SenderHomePage from './pages/sender/SenderHomePage';
import DriverHomePage from './pages/driver/DriverHomePage';
import DriverReceivePage from './pages/driver/DriverReceivePage';
import DriverColdChainPage from './pages/driver/DriverColdChainPage';
import EnterpriseHomePage from './pages/enterprise/EnterpriseHomePage';
import CreateShipmentPage from './pages/sender/CreateShipmentPage';
import ShipmentDetailPage from './pages/sender/ShipmentDetailPage';
import ShipmentQrPage from './pages/sender/ShipmentQrPage';
import HandoverPage from './pages/sender/HandoverPage';
import ShipmentHistoryPage from './pages/sender/ShipmentHistoryPage';
import NotificationsPage from './pages/sender/NotificationsPage';
import ProfilePage from './pages/sender/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SenderHomePage />} />
        <Route path="/login" element={<AuthPage initialMode="login" />} />
        <Route path="/register" element={<AuthPage initialMode="register" />} />
        <Route path="/sender" element={<SenderHomePage />} />
        <Route path="/sender/shipments/new" element={<CreateShipmentPage />} />
        <Route path="/sender/shipments" element={<ShipmentHistoryPage />} />
        <Route path="/sender/notifications" element={<NotificationsPage />} />
        <Route path="/sender/profile" element={<ProfilePage />} />
        <Route path="/sender/shipments/:shipmentId" element={<ShipmentDetailPage />} />
        <Route path="/sender/shipments/:shipmentId/qr" element={<ShipmentQrPage />} />
        <Route path="/sender/shipments/:shipmentId/handover" element={<HandoverPage />} />
        <Route path="/driver" element={<DriverHomePage />} />
        <Route path="/driver/receive" element={<DriverReceivePage />} />
        <Route path="/driver/cold-chain" element={<DriverColdChainPage />} />
        <Route path="/enterprise" element={<EnterpriseHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;