import { useState } from 'react';
import { Link } from 'react-router-dom';

type IconName = 'arrow' | 'bell' | 'box' | 'calendar' | 'check' | 'chevron' | 'clock' | 'home' | 'map' | 'pause' | 'play' | 'thermometer' | 'user' | 'warning';

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
    box: <><path d="m16.5 9.4-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73Z" /><path d="M3.3 7 12 12l8.7-5M12 22V12" /></>,
    calendar: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M9 21v-6h6v6" /></>,
    map: <><path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z" /><path d="M9 3v15M15 6v15" /></>,
    pause: <><path d="M8 5v14M16 5v14" /></>,
    play: <path d="m9 5 10 7-10 7V5Z" />,
    thermometer: <><path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0Z" /><path d="M12 11v5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    warning: <><path d="m10.3 3.8-8 14A2 2 0 0 0 4 20.8h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const temperaturePoints = [
  { time: '07:00', value: 3.7 },
  { time: '07:30', value: 4.0 },
  { time: '08:00', value: 4.2 },
  { time: '08:30', value: 4.1 },
  { time: '09:00', value: 4.4 },
  { time: '09:30', value: 4.2 },
];

function TemperatureChart() {
  const points = temperaturePoints.map((point, index) => `${36 + index * 66},${120 - (point.value - 2) * 22}`).join(' ');

  return (
    <div className="temperature-chart" role="img" aria-label="Biểu đồ nhiệt độ từ 07 giờ đến 09 giờ 30, dao động từ 3.7 đến 4.4 độ C">
      <div className="chart-scale"><span>8°C</span><span>6°C</span><span>4°C</span><span>2°C</span></div>
      <svg viewBox="0 0 400 150" preserveAspectRatio="none" aria-hidden="true">
        <path className="chart-threshold" d="M24 32H390M24 120H390" />
        <path className="chart-grid" d="M24 76H390M24 98H390" />
        <polyline className="chart-line" points={points} />
        {temperaturePoints.map((point, index) => <circle className="chart-point" cx={36 + index * 66} cy={120 - (point.value - 2) * 22} r="3.5" key={point.time} />)}
      </svg>
      <div className="chart-times">{temperaturePoints.map((point) => <span key={point.time}>{point.time}</span>)}</div>
    </div>
  );
}

function DriverColdChainPage() {
  const [isLive, setIsLive] = useState(true);
  const [isAlertResolved, setIsAlertResolved] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  return (
    <div className="app-shell driver-shell cold-chain-shell">
      <header className="topbar driver-topbar">
        <Link className="back-link" to="/driver" aria-label="Quay lại trang chủ"><span aria-hidden="true">←</span> Trang chủ</Link>
        <Link className="brand-lockup" to="/driver" aria-label="Về trang chủ ColdChain AI"><div className="brand-mark" aria-hidden="true"><Icon name="box" /></div><span>ColdChain <strong>AI</strong></span></Link>
        <button className="icon-button" type="button" aria-label="Xem thông báo"><Icon name="bell" /><span className="notification-dot" aria-hidden="true" /></button>
      </header>

      <main className="cold-chain-main">
        <section className="cold-chain-heading" aria-labelledby="cold-chain-title">
          <div><p className="eyebrow">Giám sát chuỗi lạnh</p><h1 id="cold-chain-title">Nhiệt độ đang <span>ổn định.</span></h1><p>Theo dõi lô LOT-2026-002 trên tuyến Tiền Giang → Đà Nẵng.</p></div>
          <div className="live-status"><i /> {isLive ? 'Đang cập nhật' : 'Đã tạm dừng'}<small>08/10/2026 · 09:32</small></div>
        </section>

        <section className="cold-chain-overview" aria-label="Tổng quan điều kiện bảo quản">
          <div className="temperature-kpi"><div className="kpi-icon"><Icon name="thermometer" /></div><div><span>Nhiệt độ hiện tại</span><strong>4.2<em>°C</em></strong><small><Icon name="check" /> Trong ngưỡng an toàn</small></div></div>
          <div className="threshold-gauge"><div className="gauge-head"><span>Ngưỡng yêu cầu</span><strong>2–8°C</strong></div><div className="gauge-track"><span className="gauge-range" /><i className="gauge-marker" /></div><div className="gauge-labels"><span>Thấp</span><span>Hiện tại 4.2°C</span><span>Cao</span></div></div>
          <div className="cold-stat"><span>Độ ẩm</span><strong>71<em>%</em></strong><small>Ổn định</small></div>
          <div className="cold-stat"><span>Cảm biến</span><strong className="sensor-online"><i /> Online</strong><small>Phản hồi 12 giây trước</small></div>
        </section>

        <section className="ai-alert-summary" aria-label="Tổng quan cảnh báo AI">
          <div className="ai-alert-summary-heading"><span className="ai-pulse" aria-hidden="true" /><div><p className="eyebrow">AI giám sát</p><h2>Không có bất thường nghiêm trọng</h2></div><span className="ai-last-update">Phân tích lúc 09:32</span></div>
          <div className="ai-alert-levels"><span className="ai-level ai-level-critical"><b>0</b> Khẩn cấp</span><span className="ai-level ai-level-watch"><b>{isAlertResolved ? 0 : 1}</b> Theo dõi</span><span className="ai-level ai-level-clear"><b>12</b> Đã xử lý hôm nay</span></div>
          <p className="ai-alert-summary-note">AI phát hiện và ưu tiên cảnh báo dựa trên nhiệt độ, cảm biến cửa và lịch trình tuyến.</p>
        </section>

        <section className="cold-chain-grid">
          <div className="cold-panel chart-panel">
            <div className="cold-panel-heading"><div><p className="eyebrow">Lịch sử nhiệt độ</p><h2>Ổn định trong 2 giờ 30 phút</h2></div><button className="live-toggle" type="button" onClick={() => setIsLive((value) => !value)} aria-pressed={isLive}><Icon name={isLive ? 'pause' : 'play'} /> {isLive ? 'Tạm dừng' : 'Tiếp tục'}</button></div>
            <TemperatureChart />
            <div className="chart-footnote"><span><i className="legend-line" /> Nhiệt độ thực tế</span><span><i className="legend-dash" /> Ngưỡng an toàn</span><strong>Cập nhật mỗi 30 giây</strong></div>
          </div>

          <div className="cold-panel route-panel">
            <div className="cold-panel-heading"><div><p className="eyebrow">Vị trí chuyến hàng</p><h2>Đang di chuyển</h2></div><Icon name="map" /></div>
            <div className="route-summary"><div><span>Điểm đi</span><strong>Tiền Giang</strong></div><i /><div><span>Điểm đến</span><strong>Đà Nẵng</strong></div></div>
            <div className="route-progress"><span><i />Đã đi 182 km</span><strong>42%</strong></div><div className="route-bar"><i /></div><p className="route-update"><Icon name="clock" /> Dự kiến đến lúc 18:45 hôm nay</p>
          </div>

          <div className={`cold-panel cold-alert ${isAlertResolved ? 'resolved' : ''}`}>
            <div className="alert-badge"><Icon name={isAlertResolved ? 'check' : 'warning'} /></div>
            <div className="alert-copy"><div className="alert-title-row"><p className="eyebrow">{isAlertResolved ? 'Đã xử lý' : 'Cảnh báo cần kiểm tra'}</p><span className={`alert-severity ${isAlertResolved ? 'resolved' : ''}`}><i />{isAlertResolved ? 'Đã xử lý' : 'Theo dõi'}</span></div><h2>{isAlertResolved ? 'Điều kiện bảo quản an toàn' : 'Cửa thùng xe vừa mở'}</h2><p>{isAlertResolved ? 'Hệ thống đã ghi nhận thao tác kiểm tra của bạn.' : 'Nhiệt độ tăng 0.3°C trong 2 phút qua. Hãy kiểm tra cửa thùng xe đã đóng kín.'}</p><span className="alert-meta"><strong>{isAlertResolved ? 'Đã đóng cảnh báo' : 'AI đề xuất: kiểm tra cửa thùng'}</strong> · 09:30</span>{showGuidance && !isAlertResolved && <div className="alert-guidance" role="note"><strong>Hướng dẫn nhanh</strong><span>1. Dừng xe an toàn · 2. Kiểm tra gioăng cửa · 3. Đóng cửa và theo dõi thêm 5 phút.</span></div>}</div>
            {!isAlertResolved && <div className="alert-actions"><button className="alert-secondary-action" type="button" onClick={() => setShowGuidance((value) => !value)} aria-expanded={showGuidance}>{showGuidance ? 'Ẩn hướng dẫn' : 'Xem hướng dẫn'}</button><button className="alert-action" type="button" onClick={() => setIsAlertResolved(true)}>Đã kiểm tra <Icon name="arrow" /></button></div>}
          </div>
        </section>

        <section className="cold-readings" aria-labelledby="readings-title"><div className="cold-panel-heading"><div><p className="eyebrow">Dữ liệu cảm biến</p><h2 id="readings-title">Lần ghi nhận gần nhất</h2></div><button className="text-button" type="button">Xem lịch sử <Icon name="chevron" /></button></div><div className="readings-table" role="table"><div role="row" className="reading-row reading-header"><span role="columnheader">Thời gian</span><span role="columnheader">Nhiệt độ</span><span role="columnheader">Độ ẩm</span><span role="columnheader">Trạng thái</span></div>{temperaturePoints.slice(-4).reverse().map((point) => <div role="row" className="reading-row" key={point.time}><span role="cell">08/10 · {point.time}</span><strong role="cell">{point.value.toFixed(1)}°C</strong><span role="cell">71%</span><span role="cell" className="reading-ok"><i /> Bình thường</span></div>)}</div></section>
      </main>

      <nav className="bottom-nav driver-nav" aria-label="Điều hướng chính"><Link className="nav-item" to="/driver"><span className="nav-icon"><Icon name="home" /></span><span className="nav-label">Trang chủ</span></Link><Link className="nav-item" to="/driver/receive"><span className="nav-icon"><Icon name="calendar" /></span><span className="nav-label">Nhận hàng</span></Link><Link className="nav-item active" to="/driver/cold-chain" aria-current="page"><span className="nav-icon"><Icon name="thermometer" /></span><span className="nav-label">Chuỗi lạnh</span></Link><button className="nav-item" type="button"><span className="nav-icon"><Icon name="user" /></span><span className="nav-label">Cá nhân</span></button></nav>
    </div>
  );
}

export default DriverColdChainPage;