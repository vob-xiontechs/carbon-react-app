export const formatVND = (v: number) =>
  v.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
