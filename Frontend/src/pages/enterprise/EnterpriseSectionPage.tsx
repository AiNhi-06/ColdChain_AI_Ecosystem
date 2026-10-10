import { useState } from 'react';
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

const shipments = [
  { id: 'LOT-2026-002', produce: 'Xoài cát Hòa Lộc', route: 'Tiền Giang → Đà Nẵng', temp: '4.2°C', status: 'Đang vận chuyển', risk: 'Bình thường', tone: 'blue' },
  { id: 'LOT-2026-008', produce: 'Thanh long ruột đỏ', route: 'Long An → Hà Nội', temp: '8.6°C', status: 'Đang vận chuyển', risk: 'Cần theo dõi', tone: 'amber' },
  { id: 'LOT-2026-011', produce: 'Dâu tây Đà Lạt', route: 'Lâm Đồng → Nha Trang', temp: '3.9°C', status: 'Đã bàn giao', risk: 'Bình thường', tone: 'green' },
  { id: 'LOT-2026-014', produce: 'Rau củ Đà Lạt', route: 'Lâm Đồng → TP. Hồ Chí Minh', temp: '5.1°C', status: 'Đang vận chuyển', risk: 'Dữ liệu bị trễ', tone: 'slate' },
];

function EnterpriseFrame({ section, children }: { section: string; children: React.ReactNode }) {
  return (
    <div className="enterprise-shell">
      <aside className="enterprise-sidebar">
        <Link className="brand-lockup enterprise-brand" to="/enterprise" aria-label="Về dashboard ColdChain AI"><span className="brand-mark" aria-hidden="true"><Icon name="box" /></span><span>ColdChain <strong>AI</strong></span></Link>
        <p className="enterprise-nav-label">Vận hành</p>
        <nav aria-label="Điều hướng doanh nghiệp">
          <Link className={`enterprise-nav-item ${section === 'dashboard' ? 'active' : ''}`} to="/enterprise"><Icon name="chart" /> Tổng quan</Link>
          <Link className={`enterprise-nav-item ${section === 'shipments' ? 'active' : ''}`} to="/enterprise/shipments"><Icon name="box" /> Lô hàng</Link>
          <Link className={`enterprise-nav-item ${section === 'cold-chain' ? 'active' : ''}`} to="/enterprise/cold-chain"><Icon name="thermometer" /> Chuỗi lạnh</Link>
          <Link className="enterprise-nav-item" to="/enterprise/alerts"><Icon name="warning" /> Cảnh báo AI</Link>
          <Link className="enterprise-nav-item" to="/enterprise/tracking"><Icon name="map" /> Theo dõi hành trình</Link>
          <Link className="enterprise-nav-item" to="/enterprise/reports"><Icon name="chart" /> Báo cáo</Link>
        </nav>
      </aside>
      <div className="enterprise-content">
        <header className="enterprise-topbar"><div><p className="eyebrow">Không gian doanh nghiệp</p><strong>Trung tâm vận hành</strong></div><Link className="role-back-link" to="/login">Đổi tài khoản</Link></header>
        {children}
      </div>
    </div>
  );
}

function ShipmentsPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Tất cả');
  const filters = ['Tất cả', 'Đang vận chuyển', 'Cần theo dõi', 'Đã bàn giao'];
  const visibleShipments = shipments.filter((shipment) => {
    const matchesQuery = `${shipment.id} ${shipment.produce} ${shipment.route}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'Tất cả' || shipment.status === filter || shipment.risk === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <main className="enterprise-main enterprise-shipments-page">
      <section className="enterprise-heading"><div><p className="eyebrow">Quản lý vận hành</p><h1>Quản lý <span>lô hàng.</span></h1><p className="welcome-copy">Theo dõi trạng thái, rủi ro và điều kiện vận chuyển của toàn bộ lô hàng.</p></div><button className="enterprise-export" type="button">Xuất báo cáo</button></section>
      <section className="enterprise-kpi-grid shipment-kpis" aria-label="Tóm tắt lô hàng"><div className="enterprise-kpi"><span>Tổng lô hàng</span><strong>24</strong><small className="kpi-info">Trong 30 ngày qua</small></div><div className="enterprise-kpi"><span>Đang vận chuyển</span><strong>18</strong><small className="kpi-info">75% tổng số lô</small></div><div className="enterprise-kpi"><span>Cần theo dõi</span><strong className="kpi-warning-text">03</strong><small className="kpi-warning">2 cần xử lý hôm nay</small></div><div className="enterprise-kpi"><span>Đã bàn giao</span><strong className="kpi-success-text">42</strong><small className="kpi-success">+12% so với tháng trước</small></div></section>
      <section className="enterprise-panel shipment-list-panel">
        <div className="shipment-toolbar"><label className="enterprise-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm mã lô, nông sản, tuyến đường" aria-label="Tìm kiếm lô hàng" /></label><button className="enterprise-filter" type="button">Tất cả tuyến <span>Chọn</span></button><button className="enterprise-filter" type="button">Rủi ro <span>Chọn</span></button></div>
        <div className="shipment-tabs" role="tablist" aria-label="Lọc trạng thái lô hàng">{filters.map((item) => <button className={filter === item ? 'active' : ''} type="button" role="tab" aria-selected={filter === item} onClick={() => setFilter(item)} key={item}>{item}<small>{item === 'Tất cả' ? 24 : item === 'Đang vận chuyển' ? 18 : item === 'Cần theo dõi' ? 3 : 42}</small></button>)}</div>
        <div className="enterprise-table-wrap enterprise-shipment-table"><table><thead><tr><th>Mã lô / Nông sản</th><th>Tuyến đường</th><th>Cập nhật</th><th>Nhiệt độ</th><th>Trạng thái</th><th>Rủi ro</th><th aria-label="Thao tác" /></tr></thead><tbody>{visibleShipments.map((shipment) => <tr key={shipment.id}><td><strong>{shipment.id}</strong><small>{shipment.produce}</small></td><td>{shipment.route}</td><td><strong className="table-time">12 phút trước</strong><small>Cảm biến online</small></td><td className="mono">{shipment.temp}</td><td><span className={`status status-${shipment.tone}`}><i />{shipment.status}</span></td><td><span className={`risk-label risk-${shipment.tone}`}>{shipment.risk}</span></td><td><Link className="table-action" to={`/enterprise/shipments/${shipment.id}`} aria-label={`Xem ${shipment.id}`}>Xem</Link></td></tr>)}</tbody></table>{visibleShipments.length === 0 && <div className="enterprise-empty-state"><strong>Không tìm thấy lô hàng</strong><span>Thử thay đổi từ khóa hoặc bộ lọc.</span></div>}</div>
      </section>
    </main>
  );
}

const temperaturePoints = [3.8, 4.1, 4.3, 4.2, 4.5, 4.4, 8.6, 6.7, 4.9, 4.2, 4.1, 4.2];

function ColdChainPage() {
  const [isLive, setIsLive] = useState(true);
  const points = temperaturePoints.map((value, index) => `${28 + index * 48},${168 - value * 15}`).join(' ');

  return (
    <main className="enterprise-main enterprise-cold-page">
      <section className="enterprise-heading"><div><p className="eyebrow">Giám sát chuỗi lạnh</p><h1>Điều kiện <span>đang theo dõi.</span></h1><p className="welcome-copy">Nhiệt độ và cảm biến của các lô đang vận chuyển trong thời gian thực.</p></div><button className={`live-control ${isLive ? 'active' : ''}`} type="button" aria-pressed={isLive} onClick={() => setIsLive((value) => !value)}><i /> {isLive ? 'Đang cập nhật' : 'Đã tạm dừng'}</button></section>
      <section className="cold-enterprise-overview" aria-label="Tổng quan chuỗi lạnh"><div className="cold-enterprise-stat"><span>Lô trong ngưỡng</span><strong>19 <em>/ 24</em></strong><small className="kpi-success">79.2% an toàn</small></div><div className="cold-enterprise-stat"><span>Nhiệt độ trung bình</span><strong>4.6<em>°C</em></strong><small className="kpi-info">+0.2°C trong 2 giờ</small></div><div className="cold-enterprise-stat"><span>Cảm biến online</span><strong>21 <em>/ 24</em></strong><small className="kpi-success">87.5% phản hồi tốt</small></div><div className="cold-enterprise-stat"><span>Vượt ngưỡng hôm nay</span><strong className="kpi-danger-text">02</strong><small className="kpi-danger">1 chưa xử lý</small></div></section>
      <section className="cold-enterprise-grid"><div className="enterprise-panel enterprise-temperature-panel"><div className="enterprise-panel-heading"><div><p className="eyebrow">Biến động nhiệt độ</p><h2>Toàn hệ thống · 2 giờ gần nhất</h2></div><button className="chart-range" type="button">2 giờ <span>Chọn</span></button></div><div className="enterprise-temperature-chart" role="img" aria-label="Biểu đồ nhiệt độ, có một điểm vượt ngưỡng 8.6 độ C"><div className="chart-axis"><span>10°C</span><span>8°C</span><span>6°C</span><span>4°C</span><span>2°C</span></div><svg viewBox="0 0 560 200" preserveAspectRatio="none" aria-hidden="true"><path className="enterprise-chart-grid" d="M22 18H548M22 48H548M22 78H548M22 108H548M22 138H548M22 168H548" /><path className="enterprise-threshold-line" d="M22 48H548" /><polyline className="enterprise-chart-line" points={points} />{temperaturePoints.map((value, index) => <circle className={value > 8 ? 'enterprise-chart-point anomaly' : 'enterprise-chart-point'} cx={28 + index * 48} cy={168 - value * 15} r={value > 8 ? 5 : 3} key={`${value}-${index}`} />)}</svg><div className="chart-times"><span>07:30</span><span>08:00</span><span>08:30</span><span>09:00</span><span>09:30</span></div></div><div className="enterprise-chart-legend"><span><i className="legend-line" /> Nhiệt độ thực tế</span><span><i className="legend-dash" /> Ngưỡng cao 8°C</span><span className="anomaly-key"><i /> Điểm bất thường: LOT-2026-008</span></div></div><div className="enterprise-panel enterprise-sensor-panel"><div className="enterprise-panel-heading"><div><p className="eyebrow">Thiết bị</p><h2>Trạng thái cảm biến</h2></div><Link className="text-button" to="/enterprise/shipments">Xem lô hàng <Icon name="box" /></Link></div><div className="sensor-summary"><strong>21</strong><span>thiết bị đang online</span></div><div className="sensor-row"><span><i className="sensor-dot online" /> Online</span><strong>21</strong><small>87.5%</small></div><div className="sensor-row"><span><i className="sensor-dot delayed" /> Phản hồi chậm</span><strong>02</strong><small>8.3%</small></div><div className="sensor-row"><span><i className="sensor-dot offline" /> Mất kết nối</span><strong>01</strong><small>4.2%</small></div><div className="sensor-progress"><i /></div></div></section>
      <section className="enterprise-panel cold-readings-panel"><div className="enterprise-panel-heading"><div><p className="eyebrow">Dữ liệu gần nhất</p><h2>Giám sát theo lô</h2></div><button className="text-button" type="button">Cập nhật ngay <Icon name="chart" /></button></div><div className="enterprise-table-wrap"><table><thead><tr><th>Lô hàng</th><th>Nhiệt độ</th><th>Ngưỡng</th><th>Độ ẩm</th><th>Cảm biến</th><th>Cập nhật</th></tr></thead><tbody>{shipments.map((shipment) => <tr key={shipment.id}><td><strong>{shipment.id}</strong><small>{shipment.produce}</small></td><td className={`mono ${shipment.tone === 'amber' ? 'text-warning' : ''}`}>{shipment.temp}</td><td className="mono">2–8°C</td><td className="mono">71%</td><td><span className={`sensor-state ${shipment.tone === 'slate' ? 'delayed' : 'online'}`}><i />{shipment.tone === 'slate' ? 'Trễ 3 phút' : 'Online'}</span></td><td>12 giây trước</td></tr>)}</tbody></table></div></section>
    </main>
  );
}

function EnterpriseSectionPage() {
  const section = useLocation().pathname.split('/')[2] || 'shipments';
  if (section === 'shipments') return <EnterpriseFrame section={section}><ShipmentsPage /></EnterpriseFrame>;
  if (section === 'cold-chain') return <EnterpriseFrame section={section}><ColdChainPage /></EnterpriseFrame>;
  const copy = sectionCopy[section] || sectionCopy.shipments;
  return <EnterpriseFrame section={section}><main className="enterprise-main enterprise-placeholder"><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="welcome-copy">{copy.description}</p><div className="enterprise-placeholder-card"><strong>Khung màn hình đã sẵn sàng</strong><span>Dữ liệu API và các component nghiệp vụ sẽ được kết nối trong bước tiếp theo.</span></div></main></EnterpriseFrame>;
}

export default EnterpriseSectionPage;
