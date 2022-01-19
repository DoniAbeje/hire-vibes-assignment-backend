import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema()
export class Film {
  _id?;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true, default: 1, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true, min: 0 })
  ticketPrice: number;

  @Prop({ required: true })
  country: string;

  @Prop({ type: [String], minlength: 1 })
  genre: string[];

  @Prop({ required: true })
  photo: string;

  @Prop({ required: true, unique: true })
  slug: string;
}

export const FilmSchema = SchemaFactory.createForClass(Film);
