import { useState } from 'react';
import { Link } from 'react-router-dom';

type IconName = 'bell' | 'box' | 'calendar' | 'check' | 'chevron' | 'clock' | 'home' | 'map' | 'navigation' | 'thermometer' | 'user' | 'warning';

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
    box: <><path d="m16.5 9.4-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="M3.3 7 12 12l8.7-5M12 22V12" /></>,
    calendar: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M9 21v-6h6v6" /></>,
    map: <><path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z" /><path d="M9 3v15M15 6v15" /></>,
    navigation: <><path d="m12 19 7-16-16 7 7 2 2 7Z" /></>,
    thermometer: <><path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0Z" /><path d="M12 11v5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    warning: <><path d="m10.3 3.8-8 14A2 2 0 0 0 4 20.8h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const deliveries = [
  { id: 'LOT-2026-002', crop: 'Xoài cát Hòa Lộc', route: 'Tiền Giang → Đà Nẵng', time: '08:30', weight: '800 kg', tone: 'blue' },
  { id: 'LOT-2026-007', crop: 'Dâu tây Đà Lạt', route: 'Lâm Đồng → Nha Trang', time: '14:00', weight: '240 kg', tone: 'green' },
];

function DriverHomePage() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="app-shell driver-shell">
      <header className="topbar driver-topbar">
        <Link className="brand-lockup" to="/driver" aria-label="Về trang chủ ColdChain AI">
          <div className="brand-mark" aria-hidden="true"><Icon name="box" /></div>
          <span>ColdChain <strong>AI</strong></span>
        </Link>
        <button className="icon-button notification-button" type="button" aria-label="Xem thông báo">
          <Icon name="bell" /><span className="notification-dot" aria-hidden="true" />
        </button>
      </header>

      <main className="driver-dashboard">
        <section className="welcome-row driver-welcome" aria-labelledby="driver-title">
          <div>
            <p className="eyebrow">Thứ Ba, 06 tháng 10, 2026</p>
            <h1 id="driver-title">Sẵn sàng lên đường, <span>anh Nam.</span></h1>
            <p className="welcome-copy">Hôm nay có 2 chuyến đang chờ bạn.</p>
          </div>
          <div className="profile-chip driver-profile" aria-label="Tài xế Nguyễn Văn Nam"><span>NV</span><div><strong>Nguyễn Văn Nam</strong><small>Tài xế vận chuyển</small></div></div>
        </section>

        <section className={`create-cta driver-duty-card ${isOnline ? 'is-online' : 'is-offline'}`} aria-label="Trạng thái nhận chuyến">
          <div className="duty-icon"><Icon name={isOnline ? 'navigation' : 'clock'} /></div>
          <div className="duty-copy">
            <strong>{isOnline ? 'Bạn đang trực tuyến' : 'Bạn đang tạm nghỉ'}</strong>
            <span>{isOnline ? 'Có thể nhận chuyến mới' : 'Bật trạng thái để nhận chuyến'}</span>
          </div>
          <button className="duty-toggle" type="button" role="switch" aria-checked={isOnline} onClick={() => setIsOnline((value) => !value)}>
            <span>{isOnline ? 'Đang bật' : 'Đang tắt'}</span><i aria-hidden="true" />
          </button>
        </section>

        <section className="stats-grid driver-stats" aria-label="Tổng quan công việc hôm nay">
          <div className="stat-card driver-stat"><span>Đã hoàn thành</span><strong>03</strong><small><Icon name="check" /> chuyến hôm nay</small></div>
          <div className="stat-card driver-stat"><span>Quãng đường</span><strong>126 <em>km</em></strong><small><Icon name="map" /> lộ trình đã đi</small></div>
          <div className="stat-card driver-stat"><span>Đánh giá</span><strong>4.9 <em>/ 5</em></strong><small><span className="stat-stars" aria-label="5 sao">★★★★★</span> tháng này</small></div>
        </section>

        <section className="shipment-section driver-section" aria-labelledby="delivery-title">
          <div className="section-heading">
            <div><p className="eyebrow">Lịch trình của bạn</p><h2 id="delivery-title">Chuyến sắp tới</h2></div>
            <Link className="text-button" to="/driver/receive">Nhận hàng <Icon name="chevron" /></Link>
          </div>
          <div className="shipment-list delivery-list">
            {deliveries.map((delivery, index) => (
              <article className="shipment-card delivery-card" key={delivery.id}>
                <div className={`delivery-time ${delivery.tone}`}><strong>{delivery.time}</strong><small>{index === 0 ? 'Hôm nay' : 'Ngày mai'}</small></div>
                <div className="delivery-line" aria-hidden="true" />
                <div className="delivery-details">
                  <div className="delivery-title-row"><h3>{delivery.crop}</h3>{index === 0 && <span className="status status-blue"><i />Đã nhận</span>}</div>
                  <p className="shipment-id">{delivery.id}</p>
                  <p className="shipment-route"><Icon name="map" /> {delivery.route}</p>
                </div>
                <div className="delivery-meta"><strong>{delivery.weight}</strong><button type="button" aria-label={`Mở chi tiết ${delivery.id}`}><Icon name="chevron" /></button></div>
              </article>
            ))}
          </div>
        </section>

        <section className="driver-alert" aria-label="Cảnh báo chuỗi lạnh">
          <div className="alert-icon"><Icon name="warning" /></div>
          <div><strong>Kiểm tra thiết bị trước chuyến</strong><p>Nhiệt độ thùng xe đang ở mức <b>4.2°C</b> · ổn định</p></div>
          <Icon name="chevron" />
        </section>
      </main>

      <nav className="bottom-nav driver-nav" aria-label="Điều hướng chính">
        <Link className="nav-item active" to="/driver" aria-current="page"><span className="nav-icon"><Icon name="home" /></span><span className="nav-label">Trang chủ</span></Link>
        <Link className="nav-item" to="/driver/receive"><span className="nav-icon"><Icon name="calendar" /></span><span className="nav-label">Nhận hàng</span></Link>
        <Link className="nav-item" to="/driver/cold-chain"><span className="nav-icon"><Icon name="thermometer" /></span><span className="nav-label">Chuỗi lạnh</span></Link>
        <Link className="nav-item" to="/driver/profile"><span className="nav-icon"><Icon name="user" /></span><span className="nav-label">Cá nhân</span></Link>
      </nav>
    </div>
  );
}

export default DriverHomePage;
