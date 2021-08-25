import { UpdateOffensiveWordUseCase } from './../../application/usecases/offensive-word/update-offensive-word.usecase';
import { DeleteOffensiveWordUseCase } from './../../application/usecases/offensive-word/delete-offensive-word.usecase';
import { CreateOffensiveWordUseCase } from './../../application/usecases/offensive-word/create-offensive-word.usecase';
import { GetAllOffensiveWordsUseCase } from './../../application/usecases/offensive-word/get-all-offensive-word.usecase';
import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { OffensiveWordResponse } from '../../application/usecases/offensive-word/offensive-word.response';
import { IdRequest } from '../../application/usecases/id.request';
import { OffensiveWordRequest } from '../../application/usecases/offensive-word/offensive-word.request';

@Controller('')
export class OffensiveWordController {
  constructor(
    private getAllOffensiveWordsUseCase: GetAllOffensiveWordsUseCase,
    private createOffensiveWordUseCase: CreateOffensiveWordUseCase,
    private deleteOffensiveWordUseCase: DeleteOffensiveWordUseCase,
    private updateOffensiveWordUseCase: UpdateOffensiveWordUseCase,
  ) {}

  @Get('/api/offensive-word')
  async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      const offensiveWords: OffensiveWordResponse[] =
        await this.getAllOffensiveWordsUseCase.execute();
      return res.status(200).json(offensiveWords);
    } catch (err) {
      return res.status(err.code).json({ error: err.message });
    }
  }

  @Post('/api/offensive-word')
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const { word, level } = req.body;
      const offensiveWordRequest: OffensiveWordRequest = {
        word,
        level,
      };

      const offensiveWordResponse =
        await this.createOffensiveWordUseCase.execute(offensiveWordRequest);
      return res.status(201).send(offensiveWordResponse);
    } catch (err) {
      return res.status(err.code).json({ error: err.message });
    }
  }

  @Delete('/api/offensive-word/:id')
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const idDelete: IdRequest = req.params?.id;
      await this.deleteOffensiveWordUseCase.execute(idDelete);
      return res.send('Deleted!');
    } catch (err) {
      return res.status(err.code).json({ error: err.message });
    }
  }

  @Put('/api/offensive-word/:id')
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const idUpdate: IdRequest = req.params.id;
      const { word, level } = req.body;
      const offensiveWordRequest: OffensiveWordRequest = { word, level };
      await this.updateOffensiveWordUseCase.execute(
        idUpdate,
        offensiveWordRequest,
      );
      return res.send('Updated!');
    } catch (err) {
      return res.status(err.code).json({ error: err.message });
    }
  }
}
