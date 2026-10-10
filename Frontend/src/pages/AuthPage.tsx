import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { roleLabels, rolePaths, UserRole } from '../types/roles';

type AuthMode = 'login' | 'register';
type AuthMethod = 'password' | 'otp';

type AuthPageProps = {
  initialMode?: AuthMode;
};

const demoAccounts: Array<{ role: UserRole; name: string; phone: string; password: string }> = [
  { role: 'sender', name: 'Người gửi hàng', phone: '0901234567', password: 'Sender@123' },
  { role: 'driver', name: 'Người vận chuyển', phone: '0902345678', password: 'Driver@123' },
  { role: 'enterprise', name: 'Doanh nghiệp', phone: '0903456789', password: 'Enterprise@123' },
];

function Mark() {
  return (
    <span className="auth-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16.5 9.4-9-5.19" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="M3.3 7 12 12l8.7-5" />
        <path d="M12 22V12" />
      </svg>
    </span>
  );
}

function EyeIcon({ closed = false }: { closed?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {closed ? <><path d="m3 3 18 18" /><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" /><path d="M9.9 4.2A10.7 10.7 0 0 1 12 4c5 0 8.5 4 9.7 6a11.8 11.8 0 0 1-3.1 3.6" /><path d="M6.6 6.6C4.6 8 3.2 9.7 2.3 11c1.2 2 4.7 6 9.7 6 1 0 2-.2 2.8-.5" /></> : <><path d="M2.3 12S5.5 5 12 5s9.7 7 9.7 7-3.2 7-9.7 7-9.7-7-9.7-7Z" /><circle cx="12" cy="12" r="2.8" /></>}
    </svg>
  );
}

function AuthPage({ initialMode = 'login' }: AuthPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [method, setMethod] = useState<AuthMethod>('password');
  const [selectedRole, setSelectedRole] = useState<UserRole>('sender');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrors({});
    setNotice('');
    setSubmitted(false);
    navigate(nextMode === 'login' ? '/login' : '/register', { replace: true });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const phoneValue = String(form.get('phone') || '').trim();
    const passwordValue = String(form.get('password') || '').trim();
    const otp = String(form.get('otp') || '').trim();
    const nextErrors: Record<string, string> = {};

    if (!/^0\d{9}$/.test(phoneValue.replace(/\s/g, ''))) nextErrors.phone = 'Nhập số điện thoại gồm 10 chữ số.';
    if (mode === 'register' && !String(form.get('fullName') || '').trim()) nextErrors.fullName = 'Nhập họ và tên của bạn.';
    if (method === 'password' && passwordValue.length < 6) nextErrors.password = 'Mật khẩu cần ít nhất 6 ký tự.';
    if (method === 'otp' && !/^\d{6}$/.test(otp)) nextErrors.otp = 'Mã OTP gồm 6 chữ số.';

    setErrors(nextErrors);
    setNotice('');
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
    window.setTimeout(() => {
      setSubmitted(false);
      setNotice(mode === 'login' ? 'Đăng nhập thành công. Đang mở trang chủ...' : 'Tài khoản đã được tạo thành công.');
      if (mode === 'login') navigate(rolePaths[selectedRole]);
    }, 650);
  };

  const useDemoAccount = (account: (typeof demoAccounts)[number]) => {
    setSelectedRole(account.role);
    setPhone(account.phone);
    setPassword(account.password);
    setNotice(`Đã điền tài khoản mẫu ${account.name}.`);
    setErrors({});
  };

  const isRegister = mode === 'register';

  return (
    <main className="auth-page">
      <section className="auth-aside" aria-label="Giới thiệu ColdChain AI">
        <Link className="auth-brand" to="/"><Mark /><span>ColdChain <strong>AI</strong></span></Link>
        <div className="auth-aside-copy">
          <p className="auth-kicker">Quản lý chuỗi lạnh rõ ràng hơn</p>
          <h1>Mỗi lô hàng,<br /><span>một hành trình</span><br />được bảo vệ.</h1>
          <p>Theo dõi nông sản từ điểm thu gom đến nơi bàn giao, với dữ liệu minh bạch ở từng bước.</p>
        </div>
        <div className="auth-aside-footer"><span className="auth-pulse" /> Hệ thống đang hoạt động ổn định <strong>99.9%</strong></div>
      </section>

      <section className="auth-panel">
        <Link className="auth-mobile-brand" to="/"><Mark /><span>ColdChain <strong>AI</strong></span></Link>
        <div className="auth-card">
          <div className="auth-heading">
            <p className="auth-kicker">{isRegister ? 'Bắt đầu sử dụng' : 'Chào mừng trở lại'}</p>
            <h2>{isRegister ? 'Tạo tài khoản mới' : 'Đăng nhập tài khoản'}</h2>
            <p>{isRegister ? 'Tạo hồ sơ để bắt đầu quản lý lô hàng của bạn.' : 'Đăng nhập để tiếp tục theo dõi các lô hàng.'}</p>
          </div>

          <div className="auth-mode-switch" role="tablist" aria-label="Loại tài khoản">
            <button className={!isRegister ? 'selected' : ''} type="button" role="tab" aria-selected={!isRegister} onClick={() => switchMode('login')}>Đăng nhập</button>
            <button className={isRegister ? 'selected' : ''} type="button" role="tab" aria-selected={isRegister} onClick={() => switchMode('register')}>Đăng ký</button>
          </div>

          {!isRegister && <section className="demo-accounts" aria-labelledby="demo-accounts-title">
            <div className="demo-accounts-heading">
              <span id="demo-accounts-title">Tài khoản mẫu</span>
              <small>Bấm để điền nhanh thông tin đăng nhập</small>
            </div>
            <div className="demo-account-list">
              {demoAccounts.map((account) => (
                <button
                  className={`demo-account ${selectedRole === account.role ? 'selected' : ''}`}
                  type="button"
                  key={account.role}
                  onClick={() => useDemoAccount(account)}
                >
                  <strong>{account.name}</strong>
                  <span>{account.phone}</span>
                  <small>Mật khẩu: {account.password}</small>
                </button>
              ))}
            </div>
          </section>}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {isRegister && <div className="field-group"><label htmlFor="fullName">Họ và tên <span>*</span></label><input id="fullName" name="fullName" type="text" autoComplete="name" placeholder="Ví dụ: Nguyễn Văn Minh" aria-invalid={Boolean(errors.fullName)} />{errors.fullName && <small className="field-error">{errors.fullName}</small>}</div>}
            {isRegister && <div className="field-group"><label htmlFor="senderType">Bạn là <span>*</span></label><select id="senderType" name="senderType" defaultValue="owner"><option value="owner">Chủ vựa</option><option value="collector">Điểm thu gom</option><option value="trader">Thương lái</option></select></div>}
            {!isRegister && <div className="field-group"><label htmlFor="role">Vai trò đăng nhập <span>*</span></label><select id="role" name="role" value={selectedRole} onChange={(event) => setSelectedRole(event.target.value as UserRole)}><option value="sender">{roleLabels.sender}</option><option value="driver">{roleLabels.driver}</option><option value="enterprise">{roleLabels.enterprise}</option></select></div>}
            <div className="field-group"><label htmlFor="phone">Số điện thoại <span>*</span></label><input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="090 123 4567" value={phone} onChange={(event) => setPhone(event.target.value)} aria-invalid={Boolean(errors.phone)} />{errors.phone && <small className="field-error">{errors.phone}</small>}</div>

            <div className="method-row"><span>Phương thức xác thực</span><div className="method-switch" role="tablist"><button type="button" className={method === 'password' ? 'selected' : ''} role="tab" aria-selected={method === 'password'} onClick={() => setMethod('password')}>Mật khẩu</button><button type="button" className={method === 'otp' ? 'selected' : ''} role="tab" aria-selected={method === 'otp'} onClick={() => setMethod('otp')}>Mã OTP</button></div></div>

            {method === 'password' ? (
              <div className="field-group">
                <div className="label-row">
                  <label htmlFor="password">Mật khẩu <span>*</span></label>
                  {!isRegister && <button type="button" className="forgot-button" onClick={() => setNotice('Liên kết đặt lại mật khẩu sẽ được gửi qua SMS.')}>Quên mật khẩu?</button>}
                </div>
                <div className="password-input">
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete={isRegister ? 'new-password' : 'current-password'} placeholder="Nhập mật khẩu" value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={Boolean(errors.password)} />
                  <button type="button" aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} onClick={() => setShowPassword(!showPassword)}><EyeIcon closed={showPassword} /></button>
                </div>
                {errors.password && <small className="field-error">{errors.password}</small>}
              </div>
            ) : (
              <div className="field-group">
                <label htmlFor="otp">Mã OTP <span>*</span></label>
                <div className="otp-row">
                  <input id="otp" name="otp" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="000 000" aria-invalid={Boolean(errors.otp)} />
                  <button type="button" className="send-otp" onClick={() => setNotice('Mã OTP mẫu đã được gửi đến số điện thoại của bạn.')}>Gửi mã</button>
                </div>
                {errors.otp && <small className="field-error">{errors.otp}</small>}
              </div>
            )}

            <label className="consent-row"><input type="checkbox" name="consent" required={isRegister} /><span>Tôi đồng ý với <a href="#terms">điều khoản sử dụng</a> và chính sách bảo mật.</span></label>
            <button className="auth-submit" type="submit" disabled={submitted}>{submitted ? 'Đang xử lý...' : isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}<span aria-hidden="true">→</span></button>
            {notice && <p className="auth-notice" role="status">{notice}</p>}
          </form>

          <p className="auth-switch-copy">{isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'} <button type="button" onClick={() => switchMode(isRegister ? 'login' : 'register')}>{isRegister ? 'Đăng nhập' : 'Đăng ký ngay'}</button></p>
          <p className="auth-location">{location.pathname === '/register' ? 'Tài khoản người gửi hàng' : 'Khu vực dành cho người gửi hàng'}</p>
        </div>
      </section>
    </main>
  );
}

export default AuthPage;
