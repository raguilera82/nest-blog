jest.mock('./../../../infrastructure/repositories/user.repository.pg', () => {
  return {
    UserRepositoryPG: jest.fn().mockImplementation(() => {
      return {
        save: jest.fn(),
      };
    }),
  };
});

import 'reflect-metadata';
import { SignUpUseCase, SignUpRequest } from './sign-up.usecase';
import { UserRepositoryPG } from './../../../infrastructure/repositories/user.repository.pg';
import { UserService } from '../../../domain/services/user.service';
import { Test } from '@nestjs/testing';
describe('Sign Up', () => {
  let signUpUseCase: SignUpUseCase;
  let userRepositoryPG: UserRepositoryPG;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SignUpUseCase, UserService, UserRepositoryPG],
    }).compile();

    signUpUseCase = moduleRef.get<SignUpUseCase>(SignUpUseCase);
    userRepositoryPG = moduleRef.get<UserRepositoryPG>(UserRepositoryPG);
  });

  it('should execute use case', async () => {
    const spyRepository = jest.spyOn(userRepositoryPG, 'save');
    const request: SignUpRequest = {
      email: 'hola@hola.com',
      password: 'password',
    };
    await signUpUseCase.execute(request);
    expect(spyRepository).toHaveBeenCalled();
  });
});
