import { Link } from 'react-router-dom';
import { useState } from 'react';

type NotificationItem = {
	id: string;
	type: 'alert' | 'success' | 'info';
	title: string;
	description: string;
	time: string;
	unread?: boolean;
};

const initialNotifications: NotificationItem[] = [
	{ id: 'temperature', type: 'alert', title: 'Cập nhật điều kiện bảo quản', description: 'Lô LOT-2026-002 đang được vận chuyển. Nhiệt độ hiện tại là 5°C.', time: '12 phút trước', unread: true },
	{ id: 'handover', type: 'success', title: 'Bàn giao thành công', description: 'Lô dưa lưới LOT-2026-003 đã được bàn giao cho tài xế Nguyễn Văn An.', time: 'Hôm qua, 16:40', unread: true },
	{ id: 'reminder', type: 'info', title: 'Nhắc nhở kiểm tra lô hàng', description: 'Lô thanh long LOT-2026-001 đang chờ vận chuyển. Hãy sẵn sàng khi tài xế đến nhận hàng.', time: 'Hôm qua, 09:15' },
	{ id: 'report', type: 'success', title: 'Báo cáo tháng đã sẵn sàng', description: 'Báo cáo vận chuyển tháng 09/2026 của bạn đã được tổng hợp.', time: '30/09/2026' },
];

function Icon({ name }: { name: 'package' | 'bell' | 'home' | 'list' | 'user' | 'check' | 'warning' | 'info' }) {
	const paths = {
		package: <><path d="m16.5 9.4-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="M3.3 7 12 12l8.7-5" /><path d="M12 22V12" /></>,
		bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
		home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M9 21v-6h6v6" /></>,
		list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></>,
		user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
		check: <><path d="m5 12 4 4L19 6" /></>,
		warning: <><path d="m12 3 9 18H3L12 3Z" /><path d="M12 9v4M12 17h.01" /></>,
		info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
	};
	return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function NotificationsPage() {
	const [notifications, setNotifications] = useState(initialNotifications);
	const unreadCount = notifications.filter((item) => item.unread).length;
	const markAllRead = () => setNotifications((items) => items.map((item) => ({ ...item, unread: false })));

	return (
		<div className="app-shell notifications-page">
			<header className="topbar">
				<Link className="brand-lockup" to="/sender" aria-label="Về trang chủ ColdChain AI"><div className="brand-mark"><Icon name="package" /></div><span>ColdChain <strong>AI</strong></span></Link>
				<Link className="icon-button" to="/sender/notifications" aria-label="Thông báo"><Icon name="bell" /><span className="notification-dot" aria-hidden="true" /></Link>
			</header>
			<main className="notifications-main">
				<section className="notifications-heading"><div><p className="eyebrow">Cập nhật mới nhất</p><h1>Thông <span>báo</span></h1><p>Luôn nắm bắt những thay đổi quan trọng của lô hàng.</p></div>{unreadCount > 0 && <button className="text-button" type="button" onClick={markAllRead}>Đánh dấu đã đọc</button>}</section>
				<div className="notification-summary"><div className="notification-summary-icon"><Icon name="bell" /></div><div><strong>{unreadCount} thông báo chưa đọc</strong><span>Cập nhật theo thời gian thực từ hệ thống ColdChain AI</span></div></div>
				<section className="notification-list" aria-label="Danh sách thông báo">{notifications.map((item) => <article className={`notification-item ${item.unread ? 'unread' : ''}`} key={item.id}><div className={`notification-icon notification-${item.type}`}><Icon name={item.type === 'alert' ? 'warning' : item.type === 'success' ? 'check' : 'info'} /></div><div className="notification-content"><div className="notification-title-row"><h2>{item.title}</h2>{item.unread && <span className="unread-dot" aria-label="Chưa đọc" />}</div><p>{item.description}</p><time>{item.time}</time></div></article>)}</section>
			</main>
			<nav className="bottom-nav" aria-label="Điều hướng chính"><a className="nav-item" href="/sender"><span className="nav-icon"><Icon name="home" /></span><span className="nav-label">Trang chủ</span></a><a className="nav-item" href="/sender/shipments"><span className="nav-icon"><Icon name="list" /></span><span className="nav-label">Lô hàng</span></a><a className="nav-item active" href="/sender/notifications"><span className="nav-icon"><Icon name="bell" /><b>{unreadCount}</b></span><span className="nav-label">Thông báo</span></a><a className="nav-item" href="/sender/profile"><span className="nav-icon"><Icon name="user" /></span><span className="nav-label">Cá nhân</span></a></nav>
		</div>
	);
}

export default NotificationsPage;
