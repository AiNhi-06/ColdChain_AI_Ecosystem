import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

type IconName = 'arrow-left' | 'download' | 'share' | 'package' | 'arrow-right';
function Icon({ name }: { name: IconName }) {
	const paths = {
		'arrow-left': <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
		download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
		share: <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6" /></>,
		package: <><path d="m16.5 9.4-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="M3.3 7 12 12l8.7-5" /><path d="M12 22V12" /></>,
		'arrow-right': <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
	};
	return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function ShipmentQrPage() {
	const { shipmentId = 'LOT-2026-001' } = useParams();
	const [notice, setNotice] = useState('');
	const [qrSource, setQrSource] = useState('');
	useEffect(() => {
		QRCode.toDataURL(`https://coldchain.ai/shipments/${shipmentId}`, { width: 420, margin: 2, color: { dark: '#102f42', light: '#ffffff' } })
			.then(setQrSource)
			.catch(() => setNotice('Không thể tạo mã QR. Vui lòng thử lại.'));
	}, [shipmentId]);
	return (
		<div className="app-shell qr-page">
			<header className="topbar">
				<Link className="back-link" to={`/sender/shipments/${shipmentId}`} aria-label="Quay lại chi tiết lô hàng"><Icon name="arrow-left" /><span>Chi tiết lô hàng</span></Link>
				<Link className="brand-lockup" to="/sender" aria-label="Về trang chủ ColdChain AI"><div className="brand-mark" aria-hidden="true"><Icon name="package" /></div><span>ColdChain <strong>AI</strong></span></Link>
				<span className="draft-label"><span className="draft-dot" /> QR đang hoạt động</span>
			</header>
			<main className="qr-main">
				<section className="qr-heading"><p className="eyebrow">Mã định danh lô hàng</p><h1>Mã QR <span>lô hàng</span></h1><p>Đưa mã này cho tài xế quét để đối chiếu thông tin trước khi bàn giao.</p></section>
				<section className="qr-layout">
					<div className="qr-card">
						<div className="qr-label">QUÉT ĐỂ XEM HỒ SƠ</div>
						<div className="qr-code">{qrSource ? <img src={qrSource} alt={`Mã QR cho lô hàng ${shipmentId}`} /> : <span className="qr-loading">Đang tạo mã QR…</span>}</div>
						<strong className="qr-code-id">{shipmentId}</strong>
						<span className="qr-generated">Tạo lúc 06/10/2026 · 09:42</span>
					</div>
					<div className="qr-summary">
						<span className="status status-green"><i /> Chờ vận chuyển</span>
						<h2>Thanh long ruột đỏ</h2>
						<p className="summary-id">{shipmentId}</p>
						<div className="summary-list"><div><span>Khối lượng</span><strong>500 kg</strong></div><div><span>Lộ trình</span><strong>Long An → TP. Hồ Chí Minh</strong></div><div><span>Bảo quản</span><strong>4–8°C</strong></div></div>
						<div className="qr-actions"><button className="secondary-action" type="button" onClick={() => setNotice('Mã QR đã được chuẩn bị để lưu về thiết bị.')}><Icon name="download" /> Lưu QR</button><button className="secondary-action" type="button" onClick={() => setNotice('Liên kết mã QR đã được sao chép để chia sẻ.')}><Icon name="share" /> Chia sẻ</button></div>
						<Link className="primary-action qr-handover-action" to={`/sender/shipments/${shipmentId}/handover`}>Xác nhận bàn giao <Icon name="arrow-right" /></Link>
						{notice && <p className="save-message" role="status">{notice}</p>}
					</div>
				</section>
			</main>
		</div>
	);
}

export default ShipmentQrPage;
