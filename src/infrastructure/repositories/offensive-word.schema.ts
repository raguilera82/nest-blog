import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OffensiveWordDocument = OffensiveWordMongo & Document;

@Schema({ collection: 'OffensiveWords' })
export class OffensiveWordMongo {
  @Prop({
    type: String,
    required: true,
  })
  id: string;

  @Prop({
    type: String,
    required: true,
  })
  word: string;

  @Prop({
    type: Number,
    required: true,
  })
  level: number;
}

export const OffensiveWordSchema =
  SchemaFactory.createForClass(OffensiveWordMongo);
