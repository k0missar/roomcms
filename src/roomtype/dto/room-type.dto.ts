export class RoomTypeDto {
  id: string;
  name: string;
  capacity: number;
  description: string | null;
  meta: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}
