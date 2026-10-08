import { Link, useParams } from 'react-router-dom';

type IconName = 'arrow-left' | 'arrow-right' | 'package' | 'map-pin' | 'calendar' | 'qr';

function Icon({ name }: { name: IconName }) {
	const paths = {
		'arrow-left': <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
		'arrow-right': <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
		package: <><path d="m16.5 9.4-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="M3.3 7 12 12l8.7-5" /><path d="M12 22V12" /></>,
		'map-pin': <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
		calendar: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
		qr: <><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z" /><path d="M14 14h3v3h-3zM18 18h3v3h-3zM18 14h3M14 21h3" /></>,
	};
	return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function ShipmentDetailPage() {
	const { shipmentId = 'LOT-2026-001' } = useParams();
	return (
		<div className="app-shell shipment-detail-page">
			<header className="topbar">
				<Link className="back-link" to="/sender" aria-label="Quay lại danh sách lô hàng"><Icon name="arrow-left" /><span>Danh sách lô hàng</span></Link>
				<Link className="brand-lockup" to="/sender" aria-label="Về trang chủ ColdChain AI"><div className="brand-mark" aria-hidden="true"><Icon name="package" /></div><span>ColdChain <strong>AI</strong></span></Link>
				<span className="detail-status status status-green"><i /> Chờ vận chuyển</span>
			</header>
			<main className="detail-main">
				<section className="detail-heading">
					<div><p className="eyebrow">Chi tiết lô hàng</p><h1>Thanh long ruột đỏ</h1><p className="shipment-id detail-id">{shipmentId}</p></div>
					<Link className="qr-outline-action" to={`/sender/shipments/${shipmentId}/qr`}><Icon name="qr" /> Xem mã QR</Link>
				</section>
				<section className="detail-grid">
					<div className="detail-card">
						<div className="detail-card-title"><div className="form-icon"><Icon name="package" /></div><div><h2>Thông tin lô hàng</h2><p>Thông tin đã được xác nhận</p></div></div>
						<div className="detail-info-grid">
							<div><span>Nông sản</span><strong>Thanh long ruột đỏ</strong></div>
							<div><span>Khối lượng</span><strong>500 kg</strong></div>
							<div><span>Ngày thu hoạch</span><strong>06/10/2026</strong></div>
							<div><span>Mã lô nội bộ</span><strong>MP-TLR-0610</strong></div>
						</div>
					</div>
					<div className="detail-card">
						<div className="detail-card-title"><div className="form-icon"><Icon name="map-pin" /></div><div><h2>Lộ trình & bảo quản</h2><p>Điều kiện vận chuyển đề xuất</p></div></div>
						<div className="route-visual"><div className="route-point"><b /> <span><small>Điểm lấy hàng</small><strong>Long An</strong></span></div><div className="route-line" /><div className="route-point"><b /> <span><small>Điểm giao hàng</small><strong>TP. Hồ Chí Minh</strong></span></div></div>
						<div className="temperature-chip"><span>Nhiệt độ bảo quản</span><strong>4–8°C</strong></div>
					</div>
				</section>
				<section className="next-step-card"><div><p className="eyebrow">Bước tiếp theo</p><h2>Chia sẻ mã QR khi bàn giao</h2><p>Tài xế quét mã để đối chiếu nhanh thông tin lô hàng.</p></div><Link className="primary-action" to={`/sender/shipments/${shipmentId}/qr`}>Mở mã QR <Icon name="arrow-right" /></Link></section>
			</main>
		</div>
	);
}

export default ShipmentDetailPage;
