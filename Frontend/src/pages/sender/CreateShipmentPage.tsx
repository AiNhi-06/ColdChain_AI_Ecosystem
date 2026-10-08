import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

type IconName = 'arrow-left' | 'arrow-right' | 'package' | 'calendar' | 'map-pin' | 'sparkle';

function Icon({ name }: { name: IconName }) {
	const paths = {
		'arrow-left': <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
		'arrow-right': <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
		package: <><path d="m16.5 9.4-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="M3.3 7 12 12l8.7-5" /><path d="M12 22V12" /></>,
		calendar: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
		'map-pin': <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
		sparkle: <><path d="m12 3-1.25 4.75L6 9l4.75 1.25L12 15l1.25-4.75L18 9l-4.75-1.25Z" /><path d="m19 15-.65 2.35L16 18l2.35.65L19 21l.65-2.35L22 18l-2.35-.65Z" /></>,
	};

	return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function CreateShipmentPage() {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);

	return (
		<div className="app-shell create-shipment-page">
			<header className="topbar">
				<Link className="back-link" to="/sender" aria-label="Quay lại trang chủ"><Icon name="arrow-left" /><span>Quay lại</span></Link>
				<Link className="brand-lockup" to="/sender" aria-label="Về trang chủ ColdChain AI"><div className="brand-mark" aria-hidden="true"><Icon name="package" /></div><span>ColdChain <strong>AI</strong></span></Link>
				<div className="draft-label"><span className="draft-dot" /> Tự động lưu bản nháp</div>
			</header>

			<main className="create-shipment-main">
				<section className="create-heading" aria-labelledby="create-title">
					<p className="eyebrow">Hồ sơ số lô hàng</p>
					<h1 id="create-title">Tạo hồ sơ <span>lô hàng</span></h1>
					<p>Nhập thông tin cơ bản để bắt đầu theo dõi hành trình và điều kiện bảo quản.</p>
				</section>

				<nav className="stepper" aria-label="Tiến trình tạo hồ sơ">
					{['Thông tin lô hàng', 'Lộ trình & bảo quản', 'Kiểm tra hồ sơ'].map((label, index) => {
						const number = index + 1;
						return <div className={`step-item ${step >= number ? 'active' : ''} ${step === number ? 'current' : ''}`} key={label}>
							<span className="step-number">{number}</span><span>{label}</span>
						</div>;
					})}
				</nav>

				<form className="shipment-form" onSubmit={(event) => { event.preventDefault(); navigate('/sender/shipments/LOT-2026-001/qr'); }}>
					<section className="form-card">
						<div className="form-card-heading">
							<div className="form-icon"><Icon name="package" /></div>
							<div><h2>Thông tin lô hàng</h2><p>Cho chúng tôi biết lô hàng của bạn gồm những gì.</p></div>
						</div>
						<div className="form-grid">
							<div className="field-group field-span-2">
								<label htmlFor="produce">Tên nông sản <span>*</span></label>
								<select id="produce" defaultValue="">
									<option value="" disabled>Chọn loại nông sản</option>
									<option>Thanh long ruột đỏ</option>
									<option>Xoài cát Hòa Lộc</option>
									<option>Dưa lưới</option>
									<option>Rau củ tươi</option>
								</select>
								<small className="field-hint">Chưa thấy loại nông sản? Bạn có thể nhập ở bước kiểm tra.</small>
							</div>
							<div className="field-group">
								<label htmlFor="quantity">Khối lượng <span>*</span></label>
								<div className="input-with-suffix"><input id="quantity" type="number" min="1" placeholder="Ví dụ: 500" /><span>kg</span></div>
							</div>
							<div className="field-group">
								<label htmlFor="harvest-date">Ngày thu hoạch <span>*</span></label>
								<div className="input-with-icon"><input id="harvest-date" type="date" /><Icon name="calendar" /></div>
							</div>
							<div className="field-group field-span-2">
								<label htmlFor="lot-code">Mã lô nội bộ <span className="optional">(không bắt buộc)</span></label>
								<input id="lot-code" placeholder="Ví dụ: MP-TLR-0610" />
								<small className="field-hint">Mã này giúp bạn đối chiếu với sổ kho hoặc chứng từ nội bộ.</small>
							</div>
						</div>
					</section>

					<section className="form-card">
						<div className="form-card-heading">
							<div className="form-icon"><Icon name="map-pin" /></div>
							<div><h2>Lộ trình & điều kiện bảo quản</h2><p>Thiết lập điểm đi, điểm đến và nhiệt độ phù hợp.</p></div>
						</div>
						<div className="form-grid">
							<div className="field-group">
								<label htmlFor="origin">Điểm lấy hàng <span>*</span></label>
								<input id="origin" placeholder="Tỉnh / thành phố" defaultValue="Long An" />
							</div>
							<div className="field-group">
								<label htmlFor="destination">Điểm giao hàng <span>*</span></label>
								<input id="destination" placeholder="Tỉnh / thành phố" />
							</div>
							<div className="field-group">
								<label htmlFor="temperature">Nhiệt độ bảo quản <span>*</span></label>
								<div className="input-with-suffix"><input id="temperature" type="number" placeholder="Ví dụ: 4" /><span>°C</span></div>
							</div>
							<div className="field-group">
								<label htmlFor="delivery-date">Dự kiến giao hàng <span>*</span></label>
								<div className="input-with-icon"><input id="delivery-date" type="date" /><Icon name="calendar" /></div>
							</div>
						</div>
					</section>

					<div className="form-notice"><Icon name="sparkle" /><p><strong>Mẹo từ ColdChain AI</strong><br />Nhiệt độ lý tưởng cho thanh long là từ 4–8°C. Tài xế sẽ nhận được thông tin này khi bạn xác nhận bàn giao.</p></div>

					<div className="form-actions">
						<Link className="secondary-action" to="/sender">Hủy bỏ</Link>
						<button className="primary-action" type="submit" onClick={() => setStep(2)}>Tạo hồ sơ & mở QR<Icon name="arrow-right" /></button>
					</div>
				</form>
			</main>
		</div>
	);
}

export default CreateShipmentPage;
