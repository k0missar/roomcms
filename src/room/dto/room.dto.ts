import { RoomStatus } from '../../shared/enum';

export class RoomDto {
  id: string;
  number: string;
  title: string | null;
  description: string | null;
  typeId: string;
  floor: number | null;
  price: string;
  amenities: string[] | null;
  images: string[] | null;
  status: RoomStatus;
  createdAt: Date;
  updatedAt: Date;
}
