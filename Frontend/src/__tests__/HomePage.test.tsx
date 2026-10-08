import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage from '../pages/HomePage';

describe('HomePage', () => {
  it('renders the sender dashboard and current shipments', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /Chào buổi sáng/i })).toBeInTheDocument();
    expect(screen.getByText('Tạo lô hàng mới')).toBeInTheDocument();
    expect(screen.getByText('Thanh long ruột đỏ')).toBeInTheDocument();
  });

  it('filters shipments by status', async () => {
    render(<HomePage />);
    expect(screen.getByText('Xoài cát Hòa Lộc')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Đang vận chuyển' }));
    expect(screen.getByText('Xoài cát Hòa Lộc')).toBeInTheDocument();
    expect(screen.queryByText('Thanh long ruột đỏ')).not.toBeInTheDocument();
  });
});