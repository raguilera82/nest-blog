jest.mock('./../../../infrastructure/repositories/user.repository.pg', () => {
  return {
    UserRepositoryPG: jest.fn().mockImplementation(() => {
      return {
        getByEmail: jest.fn().mockImplementation(() => null),
      };
    }),
  };
});

import { Test } from '@nestjs/testing';
import 'reflect-metadata';
import { UserRepositoryPG } from '../../../infrastructure/repositories/user.repository.pg';
import { SignInUseCase, SignInRequest } from './sign-in.usecase';
import { UserService } from '../../../domain/services/user.service';

describe('Sign In', () => {
  let signInUseCase: SignInUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SignInUseCase, UserService, UserRepositoryPG],
    }).compile();

    signInUseCase = moduleRef.get<SignInUseCase>(SignInUseCase);
  });

  it('should throw user not found exception', async () => {
    const request: SignInRequest = {
      email: 'hola@hola.com',
      password: 'password',
    };
    try {
      await signInUseCase.execute(request);
    } catch (err) {
      expect(err.code).toBe(404);
    }
  });
});
