import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

function HandoverPage() {
	const { shipmentId = 'LOT-2026-001' } = useParams();
	const [confirmed, setConfirmed] = useState(false);
	return (
		<div className="app-shell handover-page">
			<header className="topbar">
				<Link className="back-link" to={`/sender/shipments/${shipmentId}/qr`} aria-label="Quay lại mã QR"><span>←</span><span>Mã QR lô hàng</span></Link>
				<Link className="brand-lockup" to="/sender" aria-label="Về trang chủ ColdChain AI"><div className="brand-mark" aria-hidden="true">CC</div><span>ColdChain <strong>AI</strong></span></Link>
				<span className="draft-label">Bước cuối</span>
			</header>
			<main className="detail-main">
				<section className="create-heading"><p className="eyebrow">Bàn giao lô hàng</p><h1>Xác nhận <span>bàn giao</span></h1><p>Đối chiếu thông tin tài xế và phương tiện trước khi giao lô hàng.</p></section>
				<form className="handover-form" onSubmit={(event) => { event.preventDefault(); setConfirmed(true); }}>
					<section className="form-card"><div className="form-card-heading"><div className="form-icon">✓</div><div><h2>Thông tin bàn giao</h2><p>Lô hàng {shipmentId}</p></div></div><div className="form-grid"><div className="field-group"><label htmlFor="driver">Tên tài xế <span>*</span></label><input id="driver" placeholder="Nhập tên tài xế" required /></div><div className="field-group"><label htmlFor="plate">Biển số xe <span>*</span></label><input id="plate" placeholder="Ví dụ: 62C-123.45" required /></div><div className="field-group field-span-2"><label htmlFor="handover-note">Ghi chú <span className="optional">(không bắt buộc)</span></label><input id="handover-note" placeholder="Thêm ghi chú khi bàn giao..." /></div></div></section>
					<div className="form-notice"><p><strong>Kiểm tra lần cuối</strong><br />Hãy chắc chắn tài xế đã nhận đúng 500 kg thanh long và được thông báo điều kiện bảo quản 4–8°C.</p></div>
					<div className="form-actions"><Link className="secondary-action" to={`/sender/shipments/${shipmentId}/qr`}>Quay lại</Link><button className="primary-action" type="submit">{confirmed ? 'Đã xác nhận bàn giao' : 'Xác nhận bàn giao'}<span aria-hidden="true">→</span></button></div>
					{confirmed && <p className="save-message" role="status">Lô hàng đã được cập nhật trạng thái Đã bàn giao.</p>}
				</form>
			</main>
		</div>
	);
}

export default HandoverPage;
