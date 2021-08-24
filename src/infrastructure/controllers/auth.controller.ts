import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  SignInUseCase,
  SignInRequest,
} from '../../application/usecases/auth/sign-in.usecase';
import {
  SignUpAuthorUseCase,
  SignUpAuthorRequest,
} from '../../application/usecases/auth/sign-up-author.usecase';
import {
  SignUpUseCase,
  SignUpRequest,
} from '../../application/usecases/auth/sign-up.usecase';
import { logger } from '../config/logger';

@Controller('')
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase,
    private signUpAuthorUseCase: SignUpAuthorUseCase,
  ) {}

  @Post('/api/login')
  async login(@Req() req: Request, @Res() res: Response) {
    try {
      const { email, password } = req.body;
      const request: SignInRequest = {
        email,
        password,
      };
      const token = await this.signInUseCase.execute(request);
      if (token) {
        res.status(200).send({ token });
      } else {
        res.status(401).send({ error: 'Not permitted' });
      }
    } catch (err) {
      logger.error(err);
      return res.status(err.code).json({ error: err.message });
    }
  }

  @Post('/api/sign-up')
  async signUp(@Req() req: Request, @Res() res: Response) {
    try {
      const { email, password } = req.body;
      const request: SignUpRequest = {
        email,
        password,
      };
      await this.signUpUseCase.execute(request);
      res.status(201).send({ status: 'Created' });
    } catch (err) {
      return res.status(err.code).json({ error: err.message });
    }
  }

  @Post('/api/sign-up-author')
  async signUpAuthor(@Req() req: Request, @Res() res: Response) {
    try {
      const request: SignUpAuthorRequest = {
        email: req.body.email,
        password: req.body.password,
        nameAuthor: req.body.nameAuthor,
        nicknameAuthor: req.body.nicknameAuthor,
      };
      await this.signUpAuthorUseCase.execute(request);
      res.status(201).json({ status: 'Created' });
    } catch (err) {
      logger.error(err);
      return res.status(err.code).json({ error: err.message });
    }
  }
}
