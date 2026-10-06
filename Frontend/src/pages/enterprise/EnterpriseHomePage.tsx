import { Link } from 'react-router-dom';

function EnterpriseHomePage() {
  return (
    <main className="role-placeholder role-enterprise">
      <p className="eyebrow">Khu vực doanh nghiệp</p>
      <h1>Dashboard Doanh nghiệp</h1>
      <p>Kiểm soát toàn trình, chất lượng lô hàng và trung tâm cảnh báo AI.</p>
      <Link className="role-back-link" to="/login">Đổi tài khoản</Link>
    </main>
  );
}

export default EnterpriseHomePage;
