import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { BookingStatus } from '../../shared/enum';

/**
 * Безопасно извлекаем id пользователя из объекта сущности.
 * Возвращаем только string или undefined.
 */
function extractUserId(objUnknown: unknown): string | undefined {
  if (objUnknown === null || typeof objUnknown !== 'object') return undefined;

  const rec = objUnknown as Record<string, unknown>;

  // попытка найти obj.user.id
  const userVal = rec['user'];
  if (userVal && typeof userVal === 'object') {
    const idVal = (userVal as Record<string, unknown>)['id'];
    if (typeof idVal === 'string') return idVal;
  }

  // fallback на obj.userId
  const directId = rec['userId'];
  if (typeof directId === 'string') return directId;

  return undefined;
}

/**
 * Аналогичная утилита для roomId.
 */
function extractRoomId(objUnknown: unknown): string | undefined {
  if (objUnknown === null || typeof objUnknown !== 'object') return undefined;

  const rec = objUnknown as Record<string, unknown>;

  const roomVal = rec['room'];
  if (roomVal && typeof roomVal === 'object') {
    const idVal = (roomVal as Record<string, unknown>)['id'];
    if (typeof idVal === 'string') return idVal;
  }

  const directId = rec['roomId'];
  if (typeof directId === 'string') return directId;

  return undefined;
}

export class BookingDto {
  @Expose()
  id: string;

  @Expose()
  @Transform(
    (params: TransformFnParams) => {
      const obj: unknown = params.obj;
      return extractUserId(obj);
    },
    { toClassOnly: true },
  )
  userId: string;

  @Expose()
  @Transform(
    (params: TransformFnParams) => {
      const obj: unknown = params.obj;
      return extractRoomId(obj);
    },
    { toClassOnly: true },
  )
  roomId: string;

  @Expose()
  checkIn: string;

  @Expose()
  checkOut: string;

  @Expose()
  status: BookingStatus;

  @Expose()
  totalPrice: string;

  @Expose()
  meta?: Record<string, any> | null;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
