import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsArray,
} from 'class-validator';
import { RoomStatus } from '../../shared/enum';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  number: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  // id типа комнаты
  @IsString()
  @IsNotEmpty()
  typeId: string;

  @IsInt()
  @IsOptional()
  floor?: number;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenities?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsEnum(RoomStatus)
  @IsOptional()
  status?: RoomStatus;
}
