import { ApiHideProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateFilmDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsDateString()
  readonly releaseDate: Date;

  @IsInt()
  @Min(1)
  @Max(5)
  readonly rating: number;

  @Min(0)
  readonly ticketPrice: number;

  @IsNotEmpty()
  readonly country: string;

  @ArrayMinSize(1)
  readonly genre: string[];

  @IsNotEmpty()
  readonly photo: string;

  @ApiHideProperty()
  readonly slug;
}
