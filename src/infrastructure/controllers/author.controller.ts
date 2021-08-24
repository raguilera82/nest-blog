import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateAuthorUseCase } from '../../application/usecases/authors/create-author.usecase';

@Controller('')
export class AuthorController {
  constructor(private createAuthorUseCase: CreateAuthorUseCase) {}

  @Post('/api/authors')
  async createAuthor(@Req() req: Request, @Res() res: Response) {
    try {
      const { name, nickname } = req.body;

      await this.createAuthorUseCase.execute({ name, nickname });

      return res.status(201).json({ status: 'Created' });
    } catch (err) {
      return res.status(err.code).json({ error: err.message });
    }
  }
}
