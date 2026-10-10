import { Link, useLocation } from 'react-router-dom';

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
        <Link className="brand-lockup enterprise-brand" to="/enterprise" aria-label="Về dashboard ColdChain AI"><span className="brand-mark" aria-hidden="true">CC</span><span>ColdChain <strong>AI</strong></span></Link>
        <p className="enterprise-nav-label">Vận hành</p>
        <nav aria-label="Điều hướng doanh nghiệp">
          <Link className="enterprise-nav-item" to="/enterprise">Tổng quan</Link>
          <Link className={`enterprise-nav-item ${section === 'shipments' ? 'active' : ''}`} to="/enterprise/shipments">Lô hàng</Link>
          <Link className={`enterprise-nav-item ${section === 'cold-chain' ? 'active' : ''}`} to="/enterprise/cold-chain">Chuỗi lạnh</Link>
          <Link className={`enterprise-nav-item ${section === 'alerts' ? 'active' : ''}`} to="/enterprise/alerts">Cảnh báo AI</Link>
          <Link className={`enterprise-nav-item ${section === 'tracking' ? 'active' : ''}`} to="/enterprise/tracking">Theo dõi hành trình</Link>
          <Link className={`enterprise-nav-item ${section === 'reports' ? 'active' : ''}`} to="/enterprise/reports">Báo cáo</Link>
        </nav>
      </aside>
      <div className="enterprise-content"><header className="enterprise-topbar"><div><p className="eyebrow">Không gian doanh nghiệp</p><strong>Trung tâm vận hành</strong></div><Link className="role-back-link" to="/login">Đổi tài khoản</Link></header><main className="enterprise-main enterprise-placeholder"><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="welcome-copy">{copy.description}</p><div className="enterprise-placeholder-card"><strong>Khung màn hình đã sẵn sàng</strong><span>Dữ liệu API và các component nghiệp vụ sẽ được kết nối trong bước tiếp theo.</span></div></main></div>
    </div>
  );
}

export default EnterpriseSectionPage;
