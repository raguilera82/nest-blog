import { PostRepositoryMongo } from './../../infrastructure/repositories/post.repository.mongo';
import { Injectable } from '@nestjs/common';
import { Comment } from './../model/entities/comment.entity';
import { IdVO } from './../model/vos/id.vo';
import { Post } from './../model/entities/post.entity';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepositoryMongo) {}

  async create(post: Post): Promise<void> {
    return this.postRepository.save(post);
  }

  async getById(postId: IdVO): Promise<Post | null> {
    return this.postRepository.getById(postId);
  }

  async addComment(post: Post, comment: Comment): Promise<void> {
    post.addComment(comment);
    return this.postRepository.addComment(post);
  }

  async deleteComment(post: Post, idComment: IdVO): Promise<void> {
    post.deleteComment(idComment);
    return this.postRepository.deleteComment(post);
  }
}
