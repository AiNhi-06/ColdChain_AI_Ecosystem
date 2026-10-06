import { Link } from 'react-router-dom';

function DriverHomePage() {
  return (
    <main className="role-placeholder role-driver">
      <p className="eyebrow">Khu vực tài xế</p>
      <h1>Trang chủ Người vận chuyển</h1>
      <p>Nhận lô hàng, theo dõi điều kiện chuỗi lạnh và xác nhận bàn giao.</p>
      <Link className="role-back-link" to="/login">Đổi tài khoản</Link>
    </main>
  );
}

export default DriverHomePage;
