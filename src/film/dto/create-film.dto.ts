import {
  ArrayMinSize,
  IsDate,
  IsInt,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateFilmDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsDate()
  readonly releaseDate: Date;

  @IsInt()
  @Min(1)
  @Max(5)
  readonly rating: number;

  @Min(0)
  readonly ticketPrice: number;

  @IsString()
  readonly country: string;

  @ArrayMinSize(1)
  readonly genre: string[];

  @IsString()
  readonly photo: string;
}
