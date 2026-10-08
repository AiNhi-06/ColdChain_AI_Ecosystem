import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';

describe('AuthPage', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('switches between login and registration modes', () => {
    render(<MemoryRouter initialEntries={['/login']}><AuthPage /></MemoryRouter>);

    expect(screen.getByRole('heading', { name: 'Đăng nhập tài khoản' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Đăng ký' }));
    expect(screen.getByRole('heading', { name: 'Tạo tài khoản mới' })).toBeInTheDocument();
    expect(screen.getByLabelText('Họ và tên *')).toBeInTheDocument();
  });

  it('shows inline validation for an invalid phone number', () => {
    render(<MemoryRouter initialEntries={['/login']}><AuthPage /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText('Số điện thoại *'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Mật khẩu *'), { target: { value: 'secret1' } });
    fireEvent.click(screen.getByRole('button', { name: /Đăng nhập/ }));

    expect(screen.getByText('Nhập số điện thoại gồm 10 chữ số.')).toBeInTheDocument();
  });

  it('redirects a driver to the driver dashboard after login', () => {
    vi.useFakeTimers();
    render(<MemoryRouter initialEntries={['/login']}><Routes><Route path="/login" element={<AuthPage />} /><Route path="/driver" element={<h1>Trang chủ Người vận chuyển</h1>} /></Routes></MemoryRouter>);

    fireEvent.change(screen.getByLabelText('Vai trò đăng nhập *'), { target: { value: 'driver' } });
    fireEvent.change(screen.getByLabelText('Số điện thoại *'), { target: { value: '0901234567' } });
    fireEvent.change(screen.getByLabelText('Mật khẩu *'), { target: { value: 'secret1' } });
    fireEvent.click(screen.getByRole('button', { name: /Đăng nhập/ }));
    act(() => {
      vi.advanceTimersByTime(700);
    });

    expect(screen.getByRole('heading', { name: 'Trang chủ Người vận chuyển' })).toBeInTheDocument();
  });
});
