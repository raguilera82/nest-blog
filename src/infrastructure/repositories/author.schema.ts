import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDocument = AuthorMongo & Document;

@Schema({ collection: 'Authors' })
export class AuthorMongo {
  @Prop({
    type: String,
    required: true,
  })
  id: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  nickname: string;
}

export const AuthorSchema = SchemaFactory.createForClass(AuthorMongo);
