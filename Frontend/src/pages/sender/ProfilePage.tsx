import { Link } from 'react-router-dom';
import { useState } from 'react';

function Icon({ name }: { name: 'package' | 'home' | 'list' | 'bell' | 'user' | 'edit' | 'chevron' | 'shield' | 'logout' }) {
	const paths = {
		package: <><path d="m16.5 9.4-9-5.19" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="M3.3 7 12 12l8.7-5" /><path d="M12 22V12" /></>,
		home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M9 21v-6h6v6" /></>,
		list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></>,
		bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
		user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
		edit: <><path d="m4 20 4.5-1 10-10a2.12 2.12 0 0 0-3-3l-10 10L4 20Z" /><path d="m13.5 7.5 3 3" /></>,
		chevron: <path d="m9 18 6-6-6-6" />,
		shield: <><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" /><path d="m9 12 2 2 4-4" /></>,
		logout: <><path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-5" /></>,
	};
	return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function ProfilePage() {
	const [saved, setSaved] = useState(false);
	return (
		<div className="app-shell profile-page">
			<header className="topbar">
				<Link className="brand-lockup" to="/sender" aria-label="Về trang chủ ColdChain AI"><div className="brand-mark"><Icon name="package" /></div><span>ColdChain <strong>AI</strong></span></Link>
				<Link className="icon-button" to="/sender/notifications" aria-label="Xem thông báo"><Icon name="bell" /><span className="notification-dot" aria-hidden="true" /></Link>
			</header>
			<main className="profile-main">
				<section className="profile-heading"><p className="eyebrow">Tài khoản của tôi</p><h1>Thông tin <span>cá nhân</span></h1><p>Quản lý thông tin tài khoản và tùy chọn sử dụng ColdChain AI.</p></section>
				<section className="profile-card"><div className="profile-hero"><div className="profile-avatar">MP</div><div><h2>Minh Phát</h2><p>Chủ vựa · Thành viên từ tháng 03/2026</p></div><button className="profile-edit" type="button" onClick={() => setSaved(true)}><Icon name="edit" /> Chỉnh sửa</button></div><div className="profile-fields"><div><span>Họ và tên</span><strong>Nguyễn Minh Phát</strong></div><div><span>Số điện thoại</span><strong>090 123 4567</strong></div><div><span>Email</span><strong>minhphat@example.com</strong></div><div><span>Địa chỉ cơ sở</span><strong>Đức Hòa, Long An</strong></div></div>{saved && <p className="save-message" role="status">Thông tin đã sẵn sàng để chỉnh sửa.</p>}</section>
				<section className="settings-card"><h2>Cài đặt tài khoản</h2><Link className="settings-row" to="/sender/profile"><span className="settings-icon"><Icon name="shield" /></span><span><strong>Bảo mật tài khoản</strong><small>Đổi mật khẩu và quản lý phiên đăng nhập</small></span><Icon name="chevron" /></Link><Link className="settings-row" to="/sender/profile"><span className="settings-icon"><Icon name="bell" /></span><span><strong>Tùy chọn thông báo</strong><small>Chọn cách bạn nhận thông báo về lô hàng</small></span><Icon name="chevron" /></Link><button className="settings-row logout-row" type="button"><span className="settings-icon"><Icon name="logout" /></span><span><strong>Đăng xuất</strong><small>Kết thúc phiên đăng nhập hiện tại</small></span><Icon name="chevron" /></button></section>
			</main>
			<nav className="bottom-nav" aria-label="Điều hướng chính"><a className="nav-item" href="/sender"><span className="nav-icon"><Icon name="home" /></span><span className="nav-label">Trang chủ</span></a><a className="nav-item" href="/sender/shipments"><span className="nav-icon"><Icon name="list" /></span><span className="nav-label">Lô hàng</span></a><a className="nav-item" href="/sender/notifications"><span className="nav-icon"><Icon name="bell" /><b>2</b></span><span className="nav-label">Thông báo</span></a><a className="nav-item active" href="/sender/profile"><span className="nav-icon"><Icon name="user" /></span><span className="nav-label">Cá nhân</span></a></nav>
		</div>
	);
}

export default ProfilePage;
