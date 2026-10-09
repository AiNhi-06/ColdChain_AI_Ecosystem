import { useState } from 'react';
import { Link } from 'react-router-dom';

function Icon({ name }: { name: 'arrow' | 'box' | 'check' | 'home' | 'thermometer' | 'user' }) {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    box: <><path d="m16.5 9.4-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73Z" /><path d="M3.3 7 12 12l8.7-5M12 22V12" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M9 21v-6h6v6" /></>,
    thermometer: <><path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0Z" /><path d="M12 11v5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const checks = ['Đối chiếu đúng mã lô và người nhận', 'Kiểm tra hàng hóa còn nguyên vẹn', 'Xác nhận nhiệt độ khi giao vẫn trong ngưỡng 2–8°C'];

function DriverHandoverPage() {
  const [checked, setChecked] = useState([false, false, false]);
  const [confirmed, setConfirmed] = useState(false);
  const canConfirm = checked.every(Boolean);

  return (
    <div className="app-shell driver-shell driver-handover-shell">
      <header className="topbar driver-topbar">
        <Link className="back-link" to="/driver" aria-label="Quay lại trang chủ"><span aria-hidden="true">←</span> Trang chủ</Link>
        <Link className="brand-lockup" to="/driver" aria-label="Về trang chủ ColdChain AI"><div className="brand-mark" aria-hidden="true"><Icon name="box" /></div><span>ColdChain <strong>AI</strong></span></Link>
        <span className="draft-label">Bước cuối</span>
      </header>
      <main className="driver-handover-main">
        <section className="receive-heading" aria-labelledby="driver-handover-title">
          <p className="eyebrow">Quy trình bàn giao</p>
          <h1 id="driver-handover-title">Giao đúng lô, <span>đủ bằng chứng.</span></h1>
          <p>Hoàn tất đối chiếu với người nhận trước khi kết thúc chuyến hàng.</p>
        </section>
        <section className="driver-handover-layout">
          <div className="driver-handover-summary">
            <div className="handover-summary-top"><div className="form-icon"><Icon name="box" /></div><div><p className="eyebrow">Lô hàng đang giao</p><h2>LOT-2026-002</h2></div><span className="status status-blue"><i /> Đang giao</span></div>
            <div className="driver-handover-info"><div><span>Người nhận</span><strong>Nguyễn Văn An</strong></div><div><span>Điểm giao</span><strong>Đà Nẵng</strong></div><div><span>Nông sản</span><strong>Xoài cát Hòa Lộc · 800 kg</strong></div><div><span>Nhiệt độ hiện tại</span><strong className="handover-temperature"><Icon name="thermometer" /> 4.2°C</strong></div></div>
          </div>
          <div className="driver-handover-card">
            <div className="receive-section-heading"><div><p className="eyebrow">Bắt buộc</p><h2>Checklist bàn giao</h2></div><span className="receive-count">{checked.filter(Boolean).length}/3</span></div>
            <div className="checklist-items">{checks.map((item, index) => <label className={`checklist-item ${checked[index] ? 'checked' : ''}`} key={item}><input type="checkbox" checked={checked[index]} onChange={() => setChecked((items) => items.map((value, itemIndex) => itemIndex === index ? !value : value))} /><span className="checkmark"><Icon name="check" /></span><span>{item}</span></label>)}</div>
            {confirmed ? <div className="receive-success" role="status"><span><Icon name="check" /></span><div><strong>Đã hoàn tất bàn giao</strong><p>Lô LOT-2026-002 đã được ghi nhận và đồng bộ.</p></div></div> : <button className="receive-confirm" type="button" disabled={!canConfirm} onClick={() => setConfirmed(true)}><span>{canConfirm ? 'Xác nhận đã bàn giao' : 'Hoàn tất 3 bước kiểm tra'}</span><Icon name="arrow" /></button>}
          </div>
        </section>
      </main>
      <nav className="bottom-nav driver-nav" aria-label="Điều hướng chính">
        <Link className="nav-item" to="/driver"><span className="nav-icon"><Icon name="home" /></span><span className="nav-label">Trang chủ</span></Link>
        <Link className="nav-item" to="/driver/receive"><span className="nav-icon"><Icon name="box" /></span><span className="nav-label">Nhận hàng</span></Link>
        <Link className="nav-item" to="/driver/cold-chain"><span className="nav-icon"><Icon name="thermometer" /></span><span className="nav-label">Chuỗi lạnh</span></Link>
        <button className="nav-item" type="button"><span className="nav-icon"><Icon name="user" /></span><span className="nav-label">Cá nhân</span></button>
      </nav>
    </div>
  );
}

export default DriverHandoverPage;
