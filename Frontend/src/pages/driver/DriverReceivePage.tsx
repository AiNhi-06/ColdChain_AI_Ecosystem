import { useState } from 'react';
import { Link } from 'react-router-dom';

type IconName = 'arrow' | 'bell' | 'box' | 'calendar' | 'check' | 'chevron' | 'clock' | 'home' | 'map' | 'qr' | 'thermometer' | 'user';

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
    qr: <><path d="M4 4h5v5H4zM15 4h5v5h-5zM4 15h5v5H4z" /><path d="M15 15h2v2h-2zM19 17h1v3h-3v-2M15 20h1" /></>,
    thermometer: <><path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0Z" /><path d="M12 11v5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const shipments = [
  { id: 'LOT-2026-002', crop: 'Xoài cát Hòa Lộc', route: 'Tiền Giang → Đà Nẵng', time: '08:30', weight: '800 kg', temperature: '4.2°C' },
  { id: 'LOT-2026-007', crop: 'Dâu tây Đà Lạt', route: 'Lâm Đồng → Nha Trang', time: '14:00', weight: '240 kg', temperature: '3.8°C' },
];

const checklistItems = [
  'Đối chiếu mã lô và số kiện với người gửi',
  'Kiểm tra bao bì còn nguyên vẹn, không móp méo',
  'Xác nhận nhiệt độ thùng xe đang ở mức an toàn',
];

function DriverReceivePage() {
  const [selectedId, setSelectedId] = useState(shipments[0].id);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false]);
  const [isScanning, setIsScanning] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const shipment = shipments.find((item) => item.id === selectedId) ?? shipments[0];
  const canConfirm = checkedItems.every(Boolean);

  const toggleCheck = (index: number) => {
    setCheckedItems((items) => items.map((checked, itemIndex) => itemIndex === index ? !checked : checked));
    setIsConfirmed(false);
  };

  const selectShipment = (id: string) => {
    setSelectedId(id);
    setCheckedItems([false, false, false]);
    setIsConfirmed(false);
  };

  return (
    <div className="app-shell driver-shell receive-shell">
      <header className="topbar driver-topbar">
        <Link className="back-link" to="/driver" aria-label="Quay lại trang chủ"><span aria-hidden="true">←</span> Trang chủ</Link>
        <Link className="brand-lockup" to="/driver" aria-label="Về trang chủ ColdChain AI">
          <div className="brand-mark" aria-hidden="true"><Icon name="box" /></div>
          <span>ColdChain <strong>AI</strong></span>
        </Link>
        <span className="topbar-spacer" aria-hidden="true" />
      </header>

      <main className="receive-main">
        <section className="receive-heading" aria-labelledby="receive-title">
          <p className="eyebrow">Quy trình nhận hàng</p>
          <h1 id="receive-title">Nhận đúng lô, <span>giữ đúng nhiệt.</span></h1>
          <p>Đối chiếu thông tin với người gửi trước khi bạn bắt đầu chuyến đi.</p>
        </section>

        <section className="receive-stepper" aria-label="Tiến trình nhận hàng">
          <span className="active"><b>1</b> Chọn lô hàng</span>
          <i aria-hidden="true" />
          <span className={canConfirm ? 'active' : ''}><b>2</b> Kiểm tra</span>
          <i aria-hidden="true" />
          <span className={isConfirmed ? 'active' : ''}><b>3</b> Xác nhận</span>
        </section>

        <section className="receive-layout">
          <div className="receive-column">
            <div className="receive-section-heading"><div><p className="eyebrow">Chuyến đang chờ</p><h2>Chọn lô hàng</h2></div><span className="receive-count">{shipments.length} lô</span></div>
            <div className="receive-shipment-list">
              {shipments.map((item) => (
                <button className={`receive-shipment ${item.id === selectedId ? 'selected' : ''}`} type="button" key={item.id} onClick={() => selectShipment(item.id)} aria-pressed={item.id === selectedId}>
                  <span className="receive-shipment-icon"><Icon name="box" /></span>
                  <span className="receive-shipment-copy"><strong>{item.crop}</strong><small>{item.id} · {item.weight}</small><span><Icon name="map" /> {item.route}</span></span>
                  <span className="receive-shipment-check"><Icon name="check" /></span>
                </button>
              ))}
            </div>

            <button className={`scan-button ${isScanning ? 'scanning' : ''}`} type="button" onClick={() => setIsScanning((value) => !value)}>
              <span><Icon name="qr" /></span><strong>{isScanning ? 'Đang mở trình quét mã...' : 'Quét mã QR lô hàng'}</strong><Icon name="chevron" />
            </button>
          </div>

          <div className="receive-column receive-detail-column">
            <div className="receive-section-heading"><div><p className="eyebrow">Đối chiếu thông tin</p><h2>{shipment.id}</h2></div><span className="status status-blue"><i /> Chờ nhận</span></div>
            <div className="receive-detail-card">
              <div className="receive-detail-hero"><div><span className="detail-label">Nông sản</span><strong>{shipment.crop}</strong></div><span className="receive-time"><Icon name="clock" /> {shipment.time}</span></div>
              <div className="receive-detail-grid"><div><span className="detail-label">Khối lượng</span><strong>{shipment.weight}</strong></div><div><span className="detail-label">Tuyến đường</span><strong>{shipment.route}</strong></div></div>
              <div className="receive-temp"><span><Icon name="thermometer" /> Nhiệt độ lúc nhận</span><strong>{shipment.temperature}</strong><small>Trong ngưỡng an toàn 2–8°C</small></div>
            </div>

            <div className="receive-checklist">
              <div className="receive-section-heading"><div><p className="eyebrow">Bắt buộc</p><h2>Kiểm tra trước khi nhận</h2></div></div>
              <div className="checklist-items">
                {checklistItems.map((item, index) => <label className={`checklist-item ${checkedItems[index] ? 'checked' : ''}`} key={item}><input type="checkbox" checked={checkedItems[index]} onChange={() => toggleCheck(index)} /><span className="checkmark"><Icon name="check" /></span><span>{item}</span></label>)}
              </div>
            </div>

            {isConfirmed ? <div className="receive-success" role="status"><span><Icon name="check" /></span><div><strong>Đã xác nhận nhận hàng</strong><p>Lô {shipment.id} đã được ghi nhận lúc 08:24.</p><Link className="handover-next-link" to="/driver/handover">Tiếp tục đến bàn giao <Icon name="arrow" /></Link></div></div> : <button className="receive-confirm" type="button" disabled={!canConfirm} onClick={() => setIsConfirmed(true)}><span>{canConfirm ? 'Xác nhận đã nhận hàng' : 'Hoàn tất 3 bước kiểm tra'}</span><Icon name="arrow" /></button>}
          </div>
        </section>
      </main>

      <nav className="bottom-nav driver-nav" aria-label="Điều hướng chính">
        <Link className="nav-item" to="/driver"><span className="nav-icon"><Icon name="home" /></span><span className="nav-label">Trang chủ</span></Link>
        <Link className="nav-item active" to="/driver/receive" aria-current="page"><span className="nav-icon"><Icon name="calendar" /></span><span className="nav-label">Nhận hàng</span></Link>
        <Link className="nav-item" to="/driver/cold-chain"><span className="nav-icon"><Icon name="thermometer" /></span><span className="nav-label">Chuỗi lạnh</span></Link>
        <button className="nav-item" type="button"><span className="nav-icon"><Icon name="user" /></span><span className="nav-label">Cá nhân</span></button>
      </nav>
    </div>
  );
}

export default DriverReceivePage;