import { useState } from 'react';
import { Link } from 'react-router-dom';

type IconName = 'bell' | 'box' | 'chart' | 'map' | 'thermometer' | 'warning' | 'arrow';

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
    box: <><path d="m16.5 9.4-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="M3.3 7 12 12l8.7-5M12 22V12" /></>,
    chart: <><path d="M4 19V5M4 19h16" /><path d="m7 15 3-4 3 2 5-7" /></>,
    map: <><path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z" /><path d="M9 3v15M15 6v15" /></>,
    thermometer: <><path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0Z" /><path d="M12 11v5" /></>,
    warning: <><path d="m10.3 3.8-8 14A2 2 0 0 0 4 20.8h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const shipments = [
  { id: 'LOT-2026-002', produce: 'Xoài cát Hòa Lộc', route: 'Tiền Giang → Đà Nẵng', temperature: '4.2°C', status: 'Đang vận chuyển', tone: 'blue', risk: 'Bình thường' },
  { id: 'LOT-2026-008', produce: 'Thanh long ruột đỏ', route: 'Long An → Hà Nội', temperature: '8.6°C', status: 'Đang vận chuyển', tone: 'amber', risk: 'Cần theo dõi' },
  { id: 'LOT-2026-011', produce: 'Dâu tây Đà Lạt', route: 'Lâm Đồng → Nha Trang', temperature: '3.9°C', status: 'Đã bàn giao', tone: 'green', risk: 'Bình thường' },
];

function EnterpriseDashboardPage() {
  const [period, setPeriod] = useState('30 ngày qua');

  return (
    <div className="enterprise-shell">
      <aside className="enterprise-sidebar">
        <Link className="brand-lockup enterprise-brand" to="/enterprise" aria-label="Về dashboard ColdChain AI">
          <span className="brand-mark" aria-hidden="true"><Icon name="box" /></span>
          <span>ColdChain <strong>AI</strong></span>
        </Link>
        <p className="enterprise-nav-label">Vận hành</p>
        <nav aria-label="Điều hướng doanh nghiệp">
          <Link className="enterprise-nav-item active" to="/enterprise"><Icon name="chart" /> Tổng quan</Link>
          <Link className="enterprise-nav-item" to="/enterprise/shipments"><Icon name="box" /> Lô hàng</Link>
          <Link className="enterprise-nav-item" to="/enterprise/cold-chain"><Icon name="thermometer" /> Chuỗi lạnh</Link>
          <Link className="enterprise-nav-item" to="/enterprise/alerts"><Icon name="warning" /> Cảnh báo AI <b>3</b></Link>
          <Link className="enterprise-nav-item" to="/enterprise/tracking"><Icon name="map" /> Theo dõi hành trình</Link>
          <Link className="enterprise-nav-item" to="/enterprise/reports"><Icon name="chart" /> Báo cáo</Link>
        </nav>
        <Link className="enterprise-sidebar-profile" to="/login"><span>MP</span><span><strong>Minh Phát</strong><small>Doanh nghiệp</small></span></Link>
      </aside>

      <div className="enterprise-content">
        <header className="enterprise-topbar">
          <div><p className="eyebrow">Không gian doanh nghiệp</p><strong>Trung tâm vận hành</strong></div>
          <div className="enterprise-topbar-actions"><span className="enterprise-freshness"><i /> Dữ liệu cập nhật 12 giây trước</span><Link className="icon-button" to="/enterprise/alerts" aria-label="Xem thông báo"><Icon name="bell" /><span className="notification-dot" aria-hidden="true" /></Link></div>
        </header>

        <main className="enterprise-main">
          <section className="enterprise-heading">
            <div><p className="eyebrow">Thứ Ba, 06 tháng 10, 2026</p><h1>Toàn cảnh <span>vận hành.</span></h1><p className="welcome-copy">Theo dõi chất lượng và tiến độ các lô hàng của doanh nghiệp.</p></div>
            <label className="enterprise-filter-select"><span className="sr-only">Khoảng thời gian dashboard</span><select value={period} onChange={(event) => setPeriod(event.target.value)}><option>7 ngày qua</option><option>30 ngày qua</option><option>90 ngày qua</option></select></label>
          </section>

          <section className="enterprise-kpi-grid" aria-label="Tổng quan vận hành">
            <div className="enterprise-kpi"><span>Tổng lô đang vận chuyển</span><strong>24</strong><small className="kpi-info">+8.2% so với kỳ trước</small></div>
            <div className="enterprise-kpi"><span>Lô trong ngưỡng an toàn</span><strong>19</strong><small className="kpi-success">79.2% tổng số lô</small></div>
            <div className="enterprise-kpi"><span>Lô cần theo dõi</span><strong className="kpi-warning-text">03</strong><small className="kpi-warning">Có hành động đề xuất</small></div>
            <div className="enterprise-kpi"><span>Cảnh báo chưa xử lý</span><strong className="kpi-danger-text">02</strong><small className="kpi-danger">1 cảnh báo khẩn cấp</small></div>
          </section>

          <section className="enterprise-grid-primary">
            <div className="enterprise-panel enterprise-map-panel"><div className="enterprise-panel-heading"><div><p className="eyebrow">Theo dõi trực tiếp</p><h2>Vị trí các lô hàng</h2></div><Link className="text-button" to="/enterprise/tracking">Mở bản đồ <Icon name="arrow" /></Link></div><div className="enterprise-map"><span className="map-route route-one" /><span className="map-route route-two" /><i className="map-pin pin-one" /><i className="map-pin pin-two warning" /><i className="map-pin pin-three" /><div className="map-label label-one">24 lô đang hoạt động</div></div><div className="map-legend"><span><i className="map-dot green" /> Bình thường</span><span><i className="map-dot amber" /> Cần theo dõi</span></div></div>
            <div className="enterprise-panel"><div className="enterprise-panel-heading"><div><p className="eyebrow">AI giám sát</p><h2>Cảnh báo cần xử lý</h2></div><Link className="text-button" to="/enterprise/alerts">Xem tất cả <Icon name="arrow" /></Link></div><div className="enterprise-alert-item critical"><span className="enterprise-alert-icon"><Icon name="warning" /></span><div><strong>LOT-2026-008 vượt ngưỡng</strong><p>Nhiệt độ 8.6°C trong 6 phút</p><small>2 phút trước · Khẩn cấp</small></div></div><div className="enterprise-alert-item"><span className="enterprise-alert-icon amber"><Icon name="thermometer" /></span><div><strong>Cảm biến phản hồi chậm</strong><p>LOT-2026-014 · 3 phút chưa cập nhật</p><small>8 phút trước · Theo dõi</small></div></div><Link className="enterprise-alert-action" to="/enterprise/alerts">Mở trung tâm cảnh báo <Icon name="arrow" /></Link></div>
          </section>

          <section className="enterprise-panel enterprise-table-panel"><div className="enterprise-panel-heading"><div><p className="eyebrow">Danh sách hoạt động</p><h2>Lô hàng gần đây</h2></div><Link className="text-button" to="/enterprise/shipments">Quản lý lô hàng <Icon name="arrow" /></Link></div><div className="enterprise-table-wrap"><table><thead><tr><th>Mã lô / Nông sản</th><th>Tuyến đường</th><th>Nhiệt độ</th><th>Trạng thái</th><th>Rủi ro</th></tr></thead><tbody>{shipments.map((shipment) => <tr key={shipment.id}><td><strong>{shipment.id}</strong><small>{shipment.produce}</small></td><td>{shipment.route}</td><td className="mono">{shipment.temperature}</td><td><span className={`status status-${shipment.tone}`}><i />{shipment.status}</span></td><td><span className={`risk-label risk-${shipment.tone}`}>{shipment.risk}</span></td></tr>)}</tbody></table></div></section>
        </main>
      </div>
    </div>
  );
}

export default EnterpriseDashboardPage;
