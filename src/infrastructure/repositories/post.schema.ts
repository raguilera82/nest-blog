import { CommentType } from './../../domain/model/entities/comment.entity';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuthorMongo } from './author.schema';

export type PostDocument = PostMongo & Document;

@Schema({ collection: 'Posts' })
export class PostMongo {
  @Prop({
    type: String,
    required: true,
  })
  id: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    id: String,
    name: String,
    nickname: String,
  })
  author: AuthorMongo;

  @Prop([
    {
      id: String,
      nickname: String,
      content: String,
      timestamp: String,
    },
  ])
  comments: CommentType;
}

export const PostSchema = SchemaFactory.createForClass(PostMongo);
