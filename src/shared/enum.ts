export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  STAFF = 'staff',
}

export enum RoomStatus {
  AVAILABLE = 'available', // Доступен
  OUT_OF_SERVICE = 'out_of_service', // Не доступен
  MAINTENANCE = 'maintenance', // Обслуживается
  RESERVED = 'reserved', // Зарезервирован
}

export enum BookingStatus {
  PENDING = 'pending', // Рассматривается
  CONFIRMED = 'confirmed', // Подтвержден
  CANCELLED = 'cancelled', // Отменен
  EXPIRED = 'expired', // Истек
}

export enum ReviewStatus {
  PENDING = 'pending',
  APPROVED = 'approved', // Одобрен
  HIDDEN = 'hidden', // Скрыт
}
