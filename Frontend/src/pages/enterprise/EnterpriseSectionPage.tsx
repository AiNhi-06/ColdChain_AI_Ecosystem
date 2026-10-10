import { Link, useLocation } from 'react-router-dom';

type IconName = 'box' | 'chart' | 'map' | 'thermometer' | 'warning';

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    box: <><path d="m16.5 9.4-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="M3.3 7 12 12l8.7-5M12 22V12" /></>,
    chart: <><path d="M4 19V5M4 19h16" /><path d="m7 15 3-4 3 2 5-7" /></>,
    map: <><path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z" /><path d="M9 3v15M15 6v15" /></>,
    thermometer: <><path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0Z" /><path d="M12 11v5" /></>,
    warning: <><path d="m10.3 3.8-8 14A2 2 0 0 0 4 20.8h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const sectionCopy: Record<string, { eyebrow: string; title: string; description: string }> = {
  shipments: { eyebrow: 'Quản lý vận hành', title: 'Quản lý lô hàng', description: 'Tìm kiếm, lọc và mở chi tiết toàn bộ lô hàng của doanh nghiệp.' },
  'cold-chain': { eyebrow: 'Giám sát chuỗi lạnh', title: 'Dữ liệu nhiệt độ & cảm biến', description: 'Theo dõi telemetry, ngưỡng bảo quản và trạng thái thiết bị theo từng lô.' },
  alerts: { eyebrow: 'AI giám sát', title: 'Trung tâm cảnh báo', description: 'Ưu tiên vấn đề, phân công người xử lý và theo dõi kết quả khắc phục.' },
  tracking: { eyebrow: 'Theo dõi trực tiếp', title: 'Theo dõi hành trình', description: 'Xem vị trí, tiến độ và ETA của các lô hàng đang vận chuyển.' },
  reports: { eyebrow: 'Phân tích vận hành', title: 'Báo cáo & phân tích', description: 'So sánh hiệu suất giao hàng, nhiệt độ và cảnh báo theo thời gian.' },
};

function EnterpriseSectionPage() {
  const section = useLocation().pathname.split('/')[2] || 'shipments';
  const copy = sectionCopy[section] || sectionCopy.shipments;

  return (
    <div className="enterprise-shell">
      <aside className="enterprise-sidebar">
        <Link className="brand-lockup enterprise-brand" to="/enterprise" aria-label="Về dashboard ColdChain AI"><span className="brand-mark" aria-hidden="true"><Icon name="box" /></span><span>ColdChain <strong>AI</strong></span></Link>
        <p className="enterprise-nav-label">Vận hành</p>
        <nav aria-label="Điều hướng doanh nghiệp">
          <Link className="enterprise-nav-item" to="/enterprise"><Icon name="chart" /> Tổng quan</Link>
          <Link className={`enterprise-nav-item ${section === 'shipments' ? 'active' : ''}`} to="/enterprise/shipments"><Icon name="box" /> Lô hàng</Link>
          <Link className={`enterprise-nav-item ${section === 'cold-chain' ? 'active' : ''}`} to="/enterprise/cold-chain"><Icon name="thermometer" /> Chuỗi lạnh</Link>
          <Link className={`enterprise-nav-item ${section === 'alerts' ? 'active' : ''}`} to="/enterprise/alerts"><Icon name="warning" /> Cảnh báo AI</Link>
          <Link className={`enterprise-nav-item ${section === 'tracking' ? 'active' : ''}`} to="/enterprise/tracking"><Icon name="map" /> Theo dõi hành trình</Link>
          <Link className={`enterprise-nav-item ${section === 'reports' ? 'active' : ''}`} to="/enterprise/reports"><Icon name="chart" /> Báo cáo</Link>
        </nav>
      </aside>
      <div className="enterprise-content"><header className="enterprise-topbar"><div><p className="eyebrow">Không gian doanh nghiệp</p><strong>Trung tâm vận hành</strong></div><Link className="role-back-link" to="/login">Đổi tài khoản</Link></header><main className="enterprise-main enterprise-placeholder"><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="welcome-copy">{copy.description}</p><div className="enterprise-placeholder-card"><strong>Khung màn hình đã sẵn sàng</strong><span>Dữ liệu API và các component nghiệp vụ sẽ được kết nối trong bước tiếp theo.</span></div></main></div>
    </div>
  );
}

export default EnterpriseSectionPage;
