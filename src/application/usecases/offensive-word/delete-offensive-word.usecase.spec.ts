jest.mock(
  '../../../infrastructure/repositories/offensive-word.repository.mongo',
  () => {
    return {
      OffensiveWordRepositoryMongo: jest.fn().mockImplementation(() => {
        return {
          getById: jest.fn().mockImplementation(
            () =>
              new OffensiveWord({
                id: IdVO.createWithUUID('eecfe194-5d2e-4940-b69e-71050257df02'),
                word: WordVO.create('Test'),
                level: LevelVO.create(3),
              }),
          ),
          delete: jest.fn(),
        };
      }),
    };
  },
);

import { OffensiveWordService } from './../../../domain/services/offensive-word.service';
import { Test } from '@nestjs/testing';
import { DeleteOffensiveWordUseCase } from './delete-offensive-word.usecase';
import { OffensiveWordRepositoryMongo } from '../../../infrastructure/repositories/offensive-word.repository.mongo';
import { IdVO } from '../../../domain/model/vos/id.vo';
import { OffensiveWord } from '../../../domain/model/entities/offensive-word.entity';
import { WordVO } from '../../../domain/model/vos/word.vo';
import { LevelVO } from '../../../domain/model/vos/level.vo';

describe('Delete offensive word Use Case', () => {
  let deleteOffensiveWordUseCase: DeleteOffensiveWordUseCase;
  let offensiveWordRepositoryMongo: OffensiveWordRepositoryMongo;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteOffensiveWordUseCase,
        OffensiveWordService,
        OffensiveWordRepositoryMongo,
      ],
    }).compile();

    deleteOffensiveWordUseCase = moduleRef.get<DeleteOffensiveWordUseCase>(
      DeleteOffensiveWordUseCase,
    );

    offensiveWordRepositoryMongo = moduleRef.get<OffensiveWordRepositoryMongo>(
      OffensiveWordRepositoryMongo,
    );
  });

  it('should delete offensive word', async () => {
    jest.spyOn(offensiveWordRepositoryMongo, 'getById').mockResolvedValue(
      new OffensiveWord({
        id: IdVO.createWithUUID('eecfe194-5d2e-4940-b69e-71050257df02'),
        word: WordVO.create('Test'),
        level: LevelVO.create(3),
      }),
    );
    jest.spyOn(offensiveWordRepositoryMongo, 'delete').mockResolvedValue();

    await deleteOffensiveWordUseCase.execute(
      'eecfe194-5d2e-4940-b69e-71050257df02',
    );
    expect(offensiveWordRepositoryMongo.delete).toHaveBeenCalled();
  });
});
