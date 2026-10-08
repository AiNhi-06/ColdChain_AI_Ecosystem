export type UserRole = 'sender' | 'driver' | 'enterprise';

export const roleLabels: Record<UserRole, string> = {
  sender: 'Người gửi hàng',
  driver: 'Người vận chuyển',
  enterprise: 'Doanh nghiệp',
};

export const rolePaths: Record<UserRole, string> = {
  sender: '/sender',
  driver: '/driver',
  enterprise: '/enterprise',
};
