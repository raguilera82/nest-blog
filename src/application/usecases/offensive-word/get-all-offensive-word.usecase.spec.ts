jest.mock(
  './../../../infrastructure/repositories/offensive-word.repository.mongo',
  () => {
    return {
      OffensiveWordRepositoryMongo: jest.fn().mockImplementation(() => {
        return {
          getAll: jest.fn().mockImplementation(() => [
            new OffensiveWord({
              id: IdVO.create(),
              word: WordVO.create('Test'),
              level: LevelVO.create(3),
            }),
          ]),
        };
      }),
    };
  },
);

import { OffensiveWordService } from './../../../domain/services/offensive-word.service';
import { Test } from '@nestjs/testing';
import { GetAllOffensiveWordsUseCase } from './get-all-offensive-word.usecase';
import { OffensiveWordRepositoryMongo } from './../../../infrastructure/repositories/offensive-word.repository.mongo';
import { IdVO } from '../../../domain/model/vos/id.vo';
import { LevelVO } from '../../../domain/model/vos/level.vo';
import { validate } from 'uuid';
import { OffensiveWord } from '../../../domain/model/entities/offensive-word.entity';
import { WordVO } from '../../../domain/model/vos/word.vo';

describe('Get All offensive word Use Case', () => {
  let getAllOffensiveWordsUseCase: GetAllOffensiveWordsUseCase;
  let offensiveWordRepositoryMongo: OffensiveWordRepositoryMongo;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetAllOffensiveWordsUseCase,
        OffensiveWordService,
        OffensiveWordRepositoryMongo,
      ],
    }).compile();

    getAllOffensiveWordsUseCase = moduleRef.get<GetAllOffensiveWordsUseCase>(
      GetAllOffensiveWordsUseCase,
    );

    offensiveWordRepositoryMongo = moduleRef.get<OffensiveWordRepositoryMongo>(
      OffensiveWordRepositoryMongo,
    );
  });

  it('should get all offensive word from repository', async () => {
    const offensiveWords = await getAllOffensiveWordsUseCase.execute();
    expect(offensiveWordRepositoryMongo.getAll).toHaveBeenCalled();
    expect(offensiveWords[0].level).toBe(3);
    expect(offensiveWords[0].word).toEqual('Test');
    expect(validate(offensiveWords[0].id)).toBe(true);
  });
});
