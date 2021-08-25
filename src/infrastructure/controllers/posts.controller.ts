import { Controller, Post, Req, Res, Put, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  AddCommentUseCase,
  AddCommentRequest,
  AddCommentResponse,
} from '../../application/usecases/comments/add-comment.usecase';
import {
  DeleteCommentUseCase,
  DeleteCommentRequest,
} from '../../application/usecases/comments/delete-comment.usecase';
import {
  CreatePostUseCase,
  CreatePostRequest,
} from '../../application/usecases/posts/create-post.usecase';
import { logger } from '../config/logger';

@Controller('')
export class PostsController {
  constructor(
    private createPostUseCase: CreatePostUseCase,
    private addCommentUseCase: AddCommentUseCase,
    private deleteCommentUseCase: DeleteCommentUseCase,
  ) {}

  @Post('/api/posts')
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const request: CreatePostRequest = {
        title: req.body.title,
        content: req.body.content,
        authorNickname: req.body.authorNickname,
      };
      await this.createPostUseCase.execute(request);
      return res.status(201).json({ status: 'Created' });
    } catch (err) {
      return res.status(err.code).json({ error: err.message });
    }
  }

  @Put('/api/posts/:idPost/comment')
  async addComment(@Req() req: Request, @Res() res: Response) {
    try {
      const idPost = req.params.idPost;
      const nicknameComment = req.body.nicknameComment;
      const contentComment = req.body.contentComment;

      const request: AddCommentRequest = {
        postId: idPost,
        contentComment,
        nicknameComment,
      };
      logger.debug(
        `LLamo a Add Comment Use Case con ${JSON.stringify(request)}`,
      );
      const response: AddCommentResponse = await this.addCommentUseCase.execute(
        request,
      );
      res.status(200).json({ status: 'Comment added', ...response });
    } catch (err) {
      logger.error(err);
      return res.status(err.code).json({ error: err.message });
    }
  }

  @Delete('/api/posts/:idPost/comment/:idComment')
  async deleteComment(@Req() req: Request, @Res() res: Response) {
    try {
      const idPost = req.params.idPost;
      const idComment = req.params.idComment;

      const request: DeleteCommentRequest = {
        idPost,
        idComment,
      };

      await this.deleteCommentUseCase.execute(request);
      res.status(200).json({ status: 'Comment deleted' });
    } catch (err) {
      logger.error(err);
      return res.status(err.code).json({ error: err.message });
    }
  }
}
