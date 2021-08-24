jest.mock(
  './../../../infrastructure/repositories/offensive-word.repository.mongo',
  () => {
    return {
      OffensiveWordRepositoryMongo: jest.fn().mockImplementation(() => {
        return {
          save: jest.fn(),
        };
      }),
    };
  },
);

import { Test } from '@nestjs/testing';
import 'reflect-metadata';
import { CreateOffensiveWordUseCase } from './create-offensive-word.usecase';
import { OffensiveWordRepositoryMongo } from './../../../infrastructure/repositories/offensive-word.repository.mongo';
import { OffensiveWordRequest } from './offensive-word.request';
import { OffensiveWordService } from '../../../domain/services/offensive-word.service';

describe('Create offensive word Use Case', () => {
  let createOffensiveWordUseCase: CreateOffensiveWordUseCase;
  let offensiveWordRepositoryMongo: OffensiveWordRepositoryMongo;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateOffensiveWordUseCase,
        OffensiveWordService,
        OffensiveWordRepositoryMongo,
      ],
    }).compile();

    createOffensiveWordUseCase = moduleRef.get<CreateOffensiveWordUseCase>(
      CreateOffensiveWordUseCase,
    );

    offensiveWordRepositoryMongo = moduleRef.get<OffensiveWordRepositoryMongo>(
      OffensiveWordRepositoryMongo,
    );
  });

  it('should create offensive word and persist', async () => {
    const spyRepository = jest.spyOn(offensiveWordRepositoryMongo, 'save');
    const offensiveWordData: OffensiveWordRequest = {
      word: 'Caca',
      level: 1,
    };
    await createOffensiveWordUseCase.execute(offensiveWordData);
    expect(spyRepository).toHaveBeenCalled();
  });
});
