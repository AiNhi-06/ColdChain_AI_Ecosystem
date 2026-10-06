import { useState } from 'react';

type ShipmentStatus = 'Chờ vận chuyển' | 'Đang vận chuyển' | 'Đã bàn giao';
type Filter = 'Tất cả' | ShipmentStatus;

type Shipment = {
  id: string;
  produce: string;
  origin: string;
  weight: string;
  updated: string;
  status: ShipmentStatus;
  tone: 'green' | 'blue' | 'slate';
};

const shipments: Shipment[] = [
  {
    id: 'LOT-2026-001',
    produce: 'Thanh long ruột đỏ',
    origin: 'Long An → TP. Hồ Chí Minh',
    weight: '500 kg',
    updated: 'Cập nhật 12 phút trước',
    status: 'Chờ vận chuyển',
    tone: 'green',
  },
  {
    id: 'LOT-2026-002',
    produce: 'Xoài cát Hòa Lộc',
    origin: 'Tiền Giang → Đà Nẵng',
    weight: '800 kg',
    updated: 'Đang trên đường · 32 phút trước',
    status: 'Đang vận chuyển',
    tone: 'blue',
  },
  {
    id: 'LOT-2026-003',
    produce: 'Dưa lưới',
    origin: 'Lâm Đồng → Nha Trang',
    weight: '320 kg',
    updated: 'Đã hoàn tất hôm qua',
    status: 'Đã bàn giao',
    tone: 'slate',
  },
];

const filters: Filter[] = ['Tất cả', 'Chờ vận chuyển', 'Đang vận chuyển', 'Đã bàn giao'];

function Icon({ name }: { name: 'bell' | 'plus' | 'arrow' | 'package' | 'home' | 'list' | 'user' }) {
  const paths = {
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    package: <><path d="m16.5 9.4-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="M3.3 7 12 12l8.7-5" /><path d="M12 22V12" /></>,
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M9 21v-6h6v6" /></>,
    list: <><path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M3 6h.01" /><path d="M3 12h.01" /><path d="M3 18h.01" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function HomePage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Tất cả');
  const visibleShipments = activeFilter === 'Tất cả' ? shipments : shipments.filter((shipment) => shipment.status === activeFilter);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><Icon name="package" /></div>
          <span>ColdChain <strong>AI</strong></span>
        </div>
        <button className="icon-button notification-button" type="button" aria-label="Xem thông báo">
          <Icon name="bell" />
          <span className="notification-dot" aria-hidden="true" />
        </button>
      </header>

      <main className="dashboard">
        <section className="welcome-row" aria-labelledby="page-title">
          <div>
            <p className="eyebrow">Thứ Ba, 06 tháng 10, 2026</p>
            <h1 id="page-title">Chào buổi sáng, <span>anh Minh.</span></h1>
            <p className="welcome-copy">Theo dõi những lô hàng đang được chăm sóc hôm nay.</p>
          </div>
          <div className="profile-chip" aria-label="Tài khoản chủ vựa Minh Phát"><span>MP</span><div><strong>Minh Phát</strong><small>Chủ vựa</small></div></div>
        </section>

        <button className="create-cta" type="button">
          <span className="cta-icon"><Icon name="plus" /></span>
          <span><strong>Tạo lô hàng mới</strong><small>Bắt đầu hồ sơ số trong vài phút</small></span>
          <Icon name="arrow" />
        </button>

        <section className="stats-grid" aria-label="Tổng quan lô hàng">
          <div className="stat-card"><span>Đang hoạt động</span><strong>02</strong><small><i className="dot dot-blue" /> lô đang vận chuyển</small></div>
          <div className="stat-card"><span>Đã bàn giao</span><strong>18</strong><small><i className="dot dot-green" /> trong tháng này</small></div>
          <div className="stat-card"><span>Tổng khối lượng</span><strong>6.4 <em>tấn</em></strong><small><i className="dot dot-amber" /> +12% so với tháng trước</small></div>
        </section>

        <section className="shipment-section" aria-labelledby="shipments-title">
          <div className="section-heading"><div><p className="eyebrow">Quản lý vận chuyển</p><h2 id="shipments-title">Lô hàng của tôi</h2></div><button className="text-button" type="button">Xem tất cả <Icon name="arrow" /></button></div>
          <div className="filter-bar" role="tablist" aria-label="Lọc trạng thái lô hàng">
            {filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'filter-button active' : 'filter-button'} type="button" role="tab" aria-selected={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
          </div>
          <div className="shipment-list">
            {visibleShipments.map((shipment) => <article className="shipment-card" key={shipment.id}>
              <div className={`shipment-icon ${shipment.tone}`}><Icon name="package" /></div>
              <div className="shipment-main"><div className="shipment-title-row"><h3>{shipment.produce}</h3><span className={`status status-${shipment.tone}`}><i />{shipment.status}</span></div><p className="shipment-id">{shipment.id}</p><p className="shipment-route">{shipment.origin}</p></div>
              <div className="shipment-meta"><strong>{shipment.weight}</strong><small>{shipment.updated}</small></div>
              <button className="card-arrow" type="button" aria-label={`Xem chi tiết ${shipment.id}`}><Icon name="arrow" /></button>
            </article>)}
          </div>
        </section>
      </main>

      <nav className="bottom-nav" aria-label="Điều hướng chính">
        <a className="nav-item active" href="#home"><Icon name="home" /><span>Trang chủ</span></a>
        <a className="nav-item" href="#shipments"><Icon name="list" /><span>Lô hàng</span></a>
        <a className="nav-item" href="#notifications"><Icon name="bell" /><span>Thông báo</span><b>2</b></a>
        <a className="nav-item" href="#profile"><Icon name="user" /><span>Cá nhân</span></a>
      </nav>
    </div>
  );
}

export default HomePage;