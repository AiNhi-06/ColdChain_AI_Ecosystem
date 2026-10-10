import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import SenderHomePage from './pages/sender/SenderHomePage';
import DriverHomePage from './pages/driver/DriverHomePage';
import DriverReceivePage from './pages/driver/DriverReceivePage';
import DriverColdChainPage from './pages/driver/DriverColdChainPage';
import DriverHandoverPage from './pages/driver/DriverHandoverPage';
import DriverProfilePage from './pages/driver/DriverProfilePage';
import EnterpriseDashboardPage from './pages/enterprise/EnterpriseDashboardPage';
import EnterpriseSectionPage, { ShipmentDetailPage as EnterpriseShipmentDetailPage } from './pages/enterprise/EnterpriseSectionPage';
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
        <Route path="/driver/handover" element={<DriverHandoverPage />} />
        <Route path="/driver/profile" element={<DriverProfilePage />} />
        <Route path="/enterprise" element={<EnterpriseDashboardPage />} />
        <Route path="/enterprise/shipments" element={<EnterpriseSectionPage />} />
        <Route path="/enterprise/shipments/:shipmentId" element={<EnterpriseShipmentDetailPage />} />
        <Route path="/enterprise/cold-chain" element={<EnterpriseSectionPage />} />
        <Route path="/enterprise/alerts" element={<EnterpriseSectionPage />} />
        <Route path="/enterprise/tracking" element={<EnterpriseSectionPage />} />
        <Route path="/enterprise/reports" element={<EnterpriseSectionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;