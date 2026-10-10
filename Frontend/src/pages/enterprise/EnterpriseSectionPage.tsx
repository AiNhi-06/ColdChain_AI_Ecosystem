import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type IconName = 'arrow' | 'box' | 'chart' | 'map' | 'thermometer' | 'warning';

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
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

const alerts = [
  { id: 'ALT-2048', title: 'Nhiệt độ vượt ngưỡng', shipment: 'LOT-2026-008', detail: '8.6°C trong 6 phút · Ngưỡng cao 8°C', severity: 'Khẩn cấp', tone: 'critical', owner: 'Chưa phân công', age: '2 phút trước' },
  { id: 'ALT-2047', title: 'Cảm biến phản hồi chậm', shipment: 'LOT-2026-014', detail: 'Không có dữ liệu mới trong 3 phút', severity: 'Theo dõi', tone: 'warning', owner: 'Nguyễn Văn Nam', age: '8 phút trước' },
  { id: 'ALT-2045', title: 'Sai lệch lịch trình', shipment: 'LOT-2026-002', detail: 'ETA chậm hơn dự kiến 24 phút', severity: 'Cần chú ý', tone: 'info', owner: 'Trần Minh Anh', age: '32 phút trước' },
];

function AlertsPage() {
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const [resolved, setResolved] = useState<string[]>([]);
  const visibleAlerts = alerts.filter((alert) => !resolved.includes(alert.id));

  return (
    <main className="enterprise-main enterprise-alerts-page">
      <section className="enterprise-heading"><div><p className="eyebrow">AI giám sát</p><h1>Trung tâm <span>cảnh báo.</span></h1><p className="welcome-copy">Ưu tiên vấn đề, phân công xử lý và theo dõi kết quả khắc phục.</p></div><button className="enterprise-export" type="button">Xuất lịch sử</button></section>
      <section className="alert-summary-grid" aria-label="Tóm tắt cảnh báo"><div><span>Chưa xử lý</span><strong>{visibleAlerts.length}</strong><small>Cần hành động</small></div><div><span>Khẩn cấp</span><strong className="kpi-danger-text">01</strong><small className="kpi-danger">Xử lý ngay</small></div><div><span>Đang theo dõi</span><strong className="kpi-warning-text">02</strong><small className="kpi-warning">Trong 24 giờ qua</small></div><div><span>Đã xử lý hôm nay</span><strong className="kpi-success-text">12</strong><small className="kpi-success">+3 so với hôm qua</small></div></section>
      <section className="enterprise-panel alert-list-panel"><div className="alert-list-header"><div className="shipment-tabs alert-tabs" role="tablist" aria-label="Lọc cảnh báo"><button className="active" type="button" role="tab" aria-selected="true">Tất cả <small>{visibleAlerts.length}</small></button><button type="button" role="tab" aria-selected="false">Khẩn cấp <small>01</small></button><button type="button" role="tab" aria-selected="false">Đã xử lý <small>12</small></button></div><button className="enterprise-filter" type="button">Lọc theo người phụ trách <span>Chọn</span></button></div><div className="alert-list">{visibleAlerts.map((alert) => <article className={`enterprise-alert-card ${alert.tone}`} key={alert.id}><div className="alert-card-severity"><Icon name="warning" /><span>{alert.severity}</span></div><div className="alert-card-main"><div className="alert-card-title"><strong>{alert.title}</strong><span>{alert.id} · {alert.age}</span></div><p>{alert.detail}</p><div className="alert-card-meta"><span><b>Lô hàng</b> {alert.shipment}</span><span><b>Phụ trách</b> {alert.owner}</span></div></div><div className="alert-card-actions"><button type="button" onClick={() => setActiveAlert(alert.id)}>Chi tiết</button><button className="resolve-button" type="button" onClick={() => setResolved((items) => [...items, alert.id])}>Đánh dấu xử lý</button></div></article>)}</div>{visibleAlerts.length === 0 && <div className="enterprise-empty-state"><strong>Không còn cảnh báo cần xử lý</strong><span>Hệ thống đang hoạt động ổn định.</span></div>}</section>
      {activeAlert && <div className="enterprise-modal-backdrop" role="presentation" onClick={() => setActiveAlert(null)}><section className="enterprise-alert-drawer" role="dialog" aria-modal="true" aria-labelledby="alert-detail-title" onClick={(event) => event.stopPropagation()}><button className="drawer-close" type="button" aria-label="Đóng chi tiết cảnh báo" onClick={() => setActiveAlert(null)}>×</button><p className="eyebrow">Chi tiết cảnh báo</p><h2 id="alert-detail-title">{alerts.find((alert) => alert.id === activeAlert)?.title}</h2><span className="status status-slate"><i />{activeAlert}</span><div className="drawer-detail-block"><span>Vấn đề phát hiện</span><strong>{alerts.find((alert) => alert.id === activeAlert)?.detail}</strong></div><div className="drawer-detail-block"><span>Hành động đề xuất</span><strong>Kiểm tra thiết bị và xác nhận điều kiện bảo quản trong 10 phút.</strong></div><button className="receive-confirm" type="button" onClick={() => { setResolved((items) => [...items, activeAlert]); setActiveAlert(null); }}>Xác nhận đã xử lý <Icon name="arrow" /></button></section></div>}
    </main>
  );
}

function TrackingPage() {
  const [selectedShipment, setSelectedShipment] = useState(shipments[1].id);
  const selected = shipments.find((shipment) => shipment.id === selectedShipment) || shipments[1];

  return (
    <main className="enterprise-main enterprise-tracking-page">
      <section className="enterprise-heading"><div><p className="eyebrow">Theo dõi trực tiếp</p><h1>Hành trình <span>đang diễn ra.</span></h1><p className="welcome-copy">Vị trí và tiến độ của các lô hàng đang vận chuyển.</p></div><button className="live-control active" type="button"><i /> Cập nhật trực tiếp</button></section>
      <section className="tracking-layout"><div className="enterprise-panel tracking-map-panel"><div className="tracking-map"><span className="tracking-road road-a" /><span className="tracking-road road-b" /><span className="tracking-road road-c" /><button className="tracking-pin pin-a" type="button" aria-label="Mở LOT-2026-002" onClick={() => setSelectedShipment('LOT-2026-002')}><i /></button><button className="tracking-pin pin-b warning" type="button" aria-label="Mở LOT-2026-008" onClick={() => setSelectedShipment('LOT-2026-008')}><i /></button><button className="tracking-pin pin-c" type="button" aria-label="Mở LOT-2026-011" onClick={() => setSelectedShipment('LOT-2026-011')}><i /></button><span className="tracking-city city-a">Tiền Giang</span><span className="tracking-city city-b">Đà Nẵng</span><div className="tracking-map-controls"><button type="button">+</button><button type="button">−</button></div></div><div className="tracking-legend"><span><i className="map-dot green" /> Đang ổn định</span><span><i className="map-dot amber" /> Cần theo dõi</span><span>24 lô đang hoạt động</span></div></div><aside className="enterprise-panel tracking-drawer"><div className="enterprise-panel-heading"><div><p className="eyebrow">Chi tiết lô hàng</p><h2>{selected.id}</h2></div><span className={`status status-${selected.tone}`}><i />{selected.risk}</span></div><p className="tracking-produce">{selected.produce}</p><div className="tracking-route"><span>{selected.route.split(' → ')[0]}</span><i /><span>{selected.route.split(' → ')[1]}</span></div><div className="tracking-detail-grid"><div><span>Nhiệt độ</span><strong>{selected.temp}</strong></div><div><span>ETA dự kiến</span><strong>18:45</strong></div><div><span>Đã đi</span><strong>182 km</strong></div><div><span>Tiến độ</span><strong>42%</strong></div></div><div className="tracking-progress"><i /></div><div className="tracking-driver"><span>NV</span><div><small>Tài xế phụ trách</small><strong>Nguyễn Văn Nam</strong></div></div><Link className="receive-confirm tracking-detail-link" to={`/enterprise/shipments/${selected.id}`}>Mở chi tiết lô <Icon name="arrow" /></Link></aside></section><section className="enterprise-panel tracking-list-panel"><div className="enterprise-panel-heading"><div><p className="eyebrow">Đang vận chuyển</p><h2>Danh sách phương tiện</h2></div><button className="text-button" type="button">Làm mới <Icon name="chart" /></button></div><div className="tracking-mini-list">{shipments.slice(0, 3).map((shipment) => <button className={selectedShipment === shipment.id ? 'active' : ''} type="button" key={shipment.id} onClick={() => setSelectedShipment(shipment.id)}><span className={`status status-${shipment.tone}`}><i />{shipment.id}</span><span>{shipment.route}</span><strong>{shipment.temp}</strong></button>)}</div></section>
    </main>
  );
}

function ReportsPage() {
  const [period, setPeriod] = useState('30 ngày');
  const reportBars = [68, 77, 62, 83, 88, 76, 92];
  return (
    <main className="enterprise-main enterprise-reports-page">
      <section className="enterprise-heading"><div><p className="eyebrow">Phân tích vận hành</p><h1>Hiệu suất <span>chuỗi cung ứng.</span></h1><p className="welcome-copy">Theo dõi xu hướng giao hàng và chất lượng bảo quản theo thời gian.</p></div><button className="enterprise-export" type="button">Tải báo cáo</button></section>
      <div className="report-filter-bar"><span>Khoảng thời gian</span>{['7 ngày', '30 ngày', '90 ngày'].map((item) => <button className={period === item ? 'active' : ''} type="button" onClick={() => setPeriod(item)} key={item}>{item}</button>)}<button className="enterprise-filter" type="button">Tất cả tuyến <span>Chọn</span></button></div>
      <section className="report-kpi-grid"><div><span>Tỷ lệ giao đúng hạn</span><strong>94.8%</strong><small className="kpi-success">+2.4% so với kỳ trước</small></div><div><span>Thời gian vận chuyển TB</span><strong>18.4h</strong><small className="kpi-info">-1.2h so với kỳ trước</small></div><div><span>Lô giữ đúng nhiệt độ</span><strong>96.2%</strong><small className="kpi-success">Mục tiêu 95%</small></div><div><span>Tỷ lệ sự cố</span><strong className="kpi-danger-text">1.8%</strong><small className="kpi-danger">-0.6% so với kỳ trước</small></div></section>
      <section className="report-chart-grid"><div className="enterprise-panel report-chart-panel"><div className="enterprise-panel-heading"><div><p className="eyebrow">Xu hướng giao hàng</p><h2>Tỷ lệ đúng hạn · {period}</h2></div><span className="chart-current-value">94.8%</span></div><div className="report-line-chart"><div className="report-y-axis"><span>100%</span><span>90%</span><span>80%</span><span>70%</span></div><svg viewBox="0 0 560 180" preserveAspectRatio="none" aria-label="Biểu đồ tỷ lệ giao hàng đúng hạn tăng lên 94.8 phần trăm"><path className="enterprise-chart-grid" d="M24 20H548M24 60H548M24 100H548M24 140H548" /><polyline className="report-line" points="24,112 110,92 196,101 282,67 368,74 454,42 548,30" /><circle cx="548" cy="30" r="4" className="report-point" /></svg><div className="chart-times"><span>01/10</span><span>06/10</span><span>11/10</span><span>16/10</span><span>21/10</span><span>26/10</span><span>30/10</span></div></div></div><div className="enterprise-panel report-bar-panel"><div className="enterprise-panel-heading"><div><p className="eyebrow">Sản lượng theo ngày</p><h2>Lô đã bàn giao</h2></div><span className="chart-current-value">42</span></div><div className="report-bars">{reportBars.map((height, index) => <div className="report-bar-column" key={height}><span style={{ height: `${height}%` }} /><small>{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][index]}</small></div>)}</div></div></section>
      <section className="enterprise-panel report-table-panel"><div className="enterprise-panel-heading"><div><p className="eyebrow">So sánh hiệu suất</p><h2>Theo tuyến đường</h2></div><button className="text-button" type="button">Xuất CSV <Icon name="chart" /></button></div><div className="enterprise-table-wrap"><table><thead><tr><th>Tuyến đường</th><th>Số lô</th><th>Đúng hạn</th><th>Đúng nhiệt độ</th><th>Sự cố</th></tr></thead><tbody><tr><td><strong>Tiền Giang → Đà Nẵng</strong><small>Miền Trung</small></td><td className="mono">18</td><td className="mono text-success">96.4%</td><td className="mono text-success">98.1%</td><td className="mono">01</td></tr><tr><td><strong>Lâm Đồng → Nha Trang</strong><small>Tây Nguyên</small></td><td className="mono">14</td><td className="mono text-success">94.2%</td><td className="mono text-success">97.8%</td><td className="mono">00</td></tr><tr><td><strong>Long An → Hà Nội</strong><small>Miền Bắc</small></td><td className="mono">10</td><td className="mono text-warning">89.8%</td><td className="mono text-warning">91.2%</td><td className="mono text-danger">02</td></tr></tbody></table></div></section>
    </main>
  );
}

function EnterpriseSectionPage() {
  const section = useLocation().pathname.split('/')[2] || 'shipments';
  if (section === 'shipments') return <EnterpriseFrame section={section}><ShipmentsPage /></EnterpriseFrame>;
  if (section === 'cold-chain') return <EnterpriseFrame section={section}><ColdChainPage /></EnterpriseFrame>;
  if (section === 'alerts') return <EnterpriseFrame section={section}><AlertsPage /></EnterpriseFrame>;
  if (section === 'tracking') return <EnterpriseFrame section={section}><TrackingPage /></EnterpriseFrame>;
  if (section === 'reports') return <EnterpriseFrame section={section}><ReportsPage /></EnterpriseFrame>;
  const copy = sectionCopy[section] || sectionCopy.shipments;
  return <EnterpriseFrame section={section}><main className="enterprise-main enterprise-placeholder"><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="welcome-copy">{copy.description}</p><div className="enterprise-placeholder-card"><strong>Khung màn hình đã sẵn sàng</strong><span>Dữ liệu API và các component nghiệp vụ sẽ được kết nối trong bước tiếp theo.</span></div></main></EnterpriseFrame>;
}

export default EnterpriseSectionPage;
