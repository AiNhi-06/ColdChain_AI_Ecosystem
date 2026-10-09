import { useState } from 'react';
import { Link } from 'react-router-dom';

function Icon({ name }: { name: 'box' | 'check' | 'chevron' | 'home' | 'shield' | 'thermometer' | 'user' }) {
  const paths = {
    box: <><path d="m16.5 9.4-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73Z" /><path d="M3.3 7 12 12l8.7-5M12 22V12" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M9 21v-6h6v6" /></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" /><path d="m9 12 2 2 4-4" /></>,
    thermometer: <><path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0Z" /><path d="M12 11v5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function DriverProfilePage() {
  const [online, setOnline] = useState(true);
  const [activeSetting, setActiveSetting] = useState<'contact' | 'documents' | null>(null);
  return (
    <div className="app-shell driver-shell driver-profile-page">
      <header className="topbar driver-topbar">
        <Link className="brand-lockup" to="/driver" aria-label="Về trang chủ ColdChain AI"><div className="brand-mark" aria-hidden="true"><Icon name="box" /></div><span>ColdChain <strong>AI</strong></span></Link>
        <Link className="icon-button" to="/driver" aria-label="Về trang chủ tài xế"><Icon name="user" /></Link>
      </header>
      <main className="driver-profile-main">
        <section className="profile-heading"><p className="eyebrow">Tài khoản tài xế</p><h1>Hồ sơ <span>cá nhân</span></h1><p>Quản lý thông tin, phương tiện và trạng thái nhận chuyến.</p></section>
        <section className="driver-profile-hero">
          <div className="profile-avatar driver-avatar">NV</div><div><h2>Nguyễn Văn Nam</h2><p>Tài xế vận chuyển · Tham gia từ 03/2026</p><span className="driver-verified"><Icon name="check" /> Hồ sơ đã xác minh</span></div>
          <button className={`driver-online-toggle ${online ? 'online' : ''}`} type="button" role="switch" aria-checked={online} onClick={() => setOnline((value) => !value)}><i aria-hidden="true" />{online ? 'Đang trực tuyến' : 'Đang tạm nghỉ'}</button>
        </section>
        <section className="driver-profile-grid">
          <div className="profile-card"><div className="driver-card-heading"><div><p className="eyebrow">Hiệu suất</p><h2>Tổng quan hoạt động</h2></div><span className="status status-green"><i /> Tháng này</span></div><div className="driver-metrics"><div><strong>28</strong><span>Chuyến hoàn thành</span></div><div><strong>4.9</strong><span>Đánh giá trung bình</span></div><div><strong>98%</strong><span>Đúng giờ</span></div></div></div>
          <div className="profile-card"><div className="driver-card-heading"><div><p className="eyebrow">Phương tiện</p><h2>Xe đang phụ trách</h2></div><Icon name="thermometer" /></div><div className="vehicle-info"><strong>Xe tải lạnh 62C-123.45</strong><span>Thiết bị cảm biến CC-SENSOR-002</span><small><i /> Kiểm định còn hiệu lực đến 12/2026</small></div></div>
        </section>
        <section className="settings-card driver-settings"><h2>Cài đặt tài xế</h2><button className="settings-row" type="button" onClick={() => setActiveSetting('contact')} aria-expanded={activeSetting === 'contact'}><span className="settings-icon"><Icon name="user" /></span><span><strong>Thông tin liên hệ</strong><small>Số điện thoại · 090 123 4567</small></span><Icon name="chevron" /></button><button className="settings-row" type="button" onClick={() => setActiveSetting('documents')} aria-expanded={activeSetting === 'documents'}><span className="settings-icon"><Icon name="shield" /></span><span><strong>Giấy tờ & xác minh</strong><small>GPLX, CCCD và hồ sơ tài xế đã xác minh</small></span><Icon name="chevron" /></button><Link className="settings-row" to="/driver/cold-chain"><span className="settings-icon"><Icon name="thermometer" /></span><span><strong>Thiết bị chuỗi lạnh</strong><small>Xem cảm biến và ngưỡng cảnh báo</small></span><Icon name="chevron" /></Link>{activeSetting && <div className="settings-detail" role="region" aria-live="polite"><div><strong>{activeSetting === 'contact' ? 'Thông tin liên hệ' : 'Giấy tờ & xác minh'}</strong><p>{activeSetting === 'contact' ? '090 123 4567 · nam.nguyen@coldchain.ai' : 'GPLX và CCCD đã được đối chiếu. Hồ sơ đang ở trạng thái hợp lệ.'}</p></div><button type="button" onClick={() => setActiveSetting(null)}>Đóng</button></div>}</section>
      </main>
      <nav className="bottom-nav driver-nav" aria-label="Điều hướng chính"><Link className="nav-item" to="/driver"><span className="nav-icon"><Icon name="home" /></span><span className="nav-label">Trang chủ</span></Link><Link className="nav-item" to="/driver/receive"><span className="nav-icon"><Icon name="box" /></span><span className="nav-label">Nhận hàng</span></Link><Link className="nav-item" to="/driver/cold-chain"><span className="nav-icon"><Icon name="thermometer" /></span><span className="nav-label">Chuỗi lạnh</span></Link><Link className="nav-item active" to="/driver/profile" aria-current="page"><span className="nav-icon"><Icon name="user" /></span><span className="nav-label">Cá nhân</span></Link></nav>
    </div>
  );
}

export default DriverProfilePage;
