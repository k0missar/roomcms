import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomDto } from './dto/room.dto';
import { RoomEntity } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepo: Repository<RoomEntity>,
  ) {}

  async findAll(): Promise<RoomDto[]> {
    const rooms = await this.roomRepo.find({
      relations: ['type'], // чтобы room.type был загружен и был доступен type.id
    });

    return rooms.map((room) => this.toRoomDto(room));
  }

  private toRoomDto(room: RoomEntity): RoomDto {
    return {
      id: room.id,
      number: room.number,
      title: room.title,
      description: room.description,
      typeId: room.type?.id, // берем id из связанной сущности
      floor: room.floor,
      price: room.price,
      amenities: room.amenities,
      images: room.images,
      status: room.status,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    };
  }
}
