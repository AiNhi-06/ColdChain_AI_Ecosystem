import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

type Status = 'Tất cả' | 'Chờ vận chuyển' | 'Đang vận chuyển' | 'Đã bàn giao';
type HistoryShipment = {
	id: string;
	produce: string;
	route: string;
	weight: string;
	date: string;
	status: Exclude<Status, 'Tất cả'>;
	tone: 'green' | 'blue' | 'slate';
};

const historyShipments: HistoryShipment[] = [
	{ id: 'LOT-2026-001', produce: 'Thanh long ruột đỏ', route: 'Long An → TP. Hồ Chí Minh', weight: '500 kg', date: '06/10/2026', status: 'Chờ vận chuyển', tone: 'green' },
	{ id: 'LOT-2026-002', produce: 'Xoài cát Hòa Lộc', route: 'Tiền Giang → Đà Nẵng', weight: '800 kg', date: '05/10/2026', status: 'Đang vận chuyển', tone: 'blue' },
	{ id: 'LOT-2026-003', produce: 'Dưa lưới', route: 'Lâm Đồng → Nha Trang', weight: '320 kg', date: '03/10/2026', status: 'Đã bàn giao', tone: 'slate' },
	{ id: 'LOT-2026-004', produce: 'Bưởi da xanh', route: 'Bến Tre → TP. Hồ Chí Minh', weight: '1.2 tấn', date: '28/09/2026', status: 'Đã bàn giao', tone: 'slate' },
	{ id: 'LOT-2026-005', produce: 'Rau củ tổng hợp', route: 'Đà Lạt → Bình Dương', weight: '650 kg', date: '24/09/2026', status: 'Đã bàn giao', tone: 'slate' },
];

function Icon({ name }: { name: 'package' | 'search' | 'calendar' | 'arrow-left' | 'arrow-right' | 'home' | 'list' | 'bell' | 'user' }) {
	const paths = {
		package: <><path d="m16.5 9.4-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="M3.3 7 12 12l8.7-5" /><path d="M12 22V12" /></>,
		search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
		calendar: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
		'arrow-left': <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
		'arrow-right': <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
		home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M9 21v-6h6v6" /></>,
		list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></>,
		bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
		user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
	};
	return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function ShipmentHistoryPage() {
	const [status, setStatus] = useState<Status>('Tất cả');
	const [query, setQuery] = useState('');
	const [period, setPeriod] = useState('Tất cả thời gian');
	const filteredShipments = useMemo(() => historyShipments.filter((shipment) => {
		const matchesStatus = status === 'Tất cả' || shipment.status === status;
		const normalizedQuery = query.trim().toLowerCase();
		return matchesStatus && (!normalizedQuery || `${shipment.id} ${shipment.produce} ${shipment.route}`.toLowerCase().includes(normalizedQuery));
	}), [query, status]);

	return (
		<div className="app-shell history-page">
			<header className="topbar">
				<Link className="brand-lockup" to="/sender" aria-label="Về trang chủ ColdChain AI"><div className="brand-mark" aria-hidden="true"><Icon name="package" /></div><span>ColdChain <strong>AI</strong></span></Link>
				<button className="icon-button" type="button" aria-label="Xem thông báo"><Icon name="bell" /><span className="notification-dot" aria-hidden="true" /></button>
			</header>
			<main className="history-main">
				<section className="history-heading"><div><p className="eyebrow">Quản lý vận chuyển</p><h1>Lịch sử <span>lô hàng</span></h1><p>Tra cứu và theo dõi toàn bộ lô hàng của bạn.</p></div><Link className="primary-action" to="/sender/shipments/new">+ Tạo lô hàng mới</Link></section>
				<section className="history-stats" aria-label="Tổng quan lịch sử"><div><span>Tổng lô hàng</span><strong>24</strong><small>từ đầu năm 2026</small></div><div><span>Đã bàn giao</span><strong>18</strong><small className="stat-positive">75% hoàn tất</small></div><div><span>Đang hoạt động</span><strong>02</strong><small>cần theo dõi</small></div><div><span>Tổng khối lượng</span><strong>6.4 <em>tấn</em></strong><small>trong tháng này</small></div></section>
				<section className="history-toolbar" aria-label="Bộ lọc lô hàng"><div className="history-search"><Icon name="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo mã lô hoặc nông sản..." aria-label="Tìm kiếm lô hàng" /></div><div className="history-select"><Icon name="calendar" /><select value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Lọc theo thời gian"><option>Tất cả thời gian</option><option>Tháng 10, 2026</option><option>Tháng 09, 2026</option></select></div></section>
				<section className="history-list-section" aria-labelledby="history-list-title"><div className="history-section-heading"><div><h2 id="history-list-title">Tất cả lô hàng</h2><span>{filteredShipments.length} kết quả hiển thị</span></div><div className="history-tabs" role="tablist" aria-label="Lọc trạng thái">{(['Tất cả', 'Chờ vận chuyển', 'Đang vận chuyển', 'Đã bàn giao'] as Status[]).map((item) => <button key={item} className={status === item ? 'active' : ''} type="button" role="tab" aria-selected={status === item} onClick={() => setStatus(item)}>{item}</button>)}</div></div>
					<div className="history-list">{filteredShipments.map((shipment) => <article className="history-row" key={shipment.id}><div className={`shipment-icon ${shipment.tone}`}><Icon name="package" /></div><div className="history-row-main"><div className="history-row-title"><h3>{shipment.produce}</h3><span className={`status status-${shipment.tone}`}><i />{shipment.status}</span></div><p className="shipment-id">{shipment.id}</p><p>{shipment.route}</p></div><div className="history-row-meta"><span>Khối lượng</span><strong>{shipment.weight}</strong><span>Ngày tạo</span><strong>{shipment.date}</strong></div><Link className="card-arrow" to={`/sender/shipments/${shipment.id}`} aria-label={`Xem chi tiết ${shipment.id}`}><Icon name="arrow-right" /></Link></article>)}</div>
					{filteredShipments.length === 0 && <div className="history-empty"><div className="form-icon"><Icon name="search" /></div><h3>Chưa tìm thấy lô hàng phù hợp</h3><p>Thử tìm bằng mã lô khác hoặc bỏ bớt bộ lọc.</p><button type="button" onClick={() => { setQuery(''); setStatus('Tất cả'); }}>Xóa bộ lọc</button></div>}
				</section>
			</main>
			<nav className="bottom-nav" aria-label="Điều hướng chính"><a className="nav-item" href="/sender"><span className="nav-icon"><Icon name="home" /></span><span className="nav-label">Trang chủ</span></a><a className="nav-item active" href="/sender/shipments"><span className="nav-icon"><Icon name="list" /></span><span className="nav-label">Lô hàng</span></a><a className="nav-item" href="/sender/notifications"><span className="nav-icon"><Icon name="bell" /><b>2</b></span><span className="nav-label">Thông báo</span></a><a className="nav-item" href="/sender/profile"><span className="nav-icon"><Icon name="user" /></span><span className="nav-label">Cá nhân</span></a></nav>
		</div>
	);
}

export default ShipmentHistoryPage;
