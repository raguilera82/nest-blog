import { OffensiveWordService } from './../../../domain/services/offensive-word.service';
import { Test } from '@nestjs/testing';
import { UpdateOffensiveWordUseCase } from './update-offensive-word.usecase';
import { OffensiveWordRepositoryMongo } from './../../../infrastructure/repositories/offensive-word.repository.mongo';
import { IdVO } from '../../../domain/model/vos/id.vo';
import { OffensiveWord } from '../../../domain/model/entities/offensive-word.entity';
import { LevelVO } from '../../../domain/model/vos/level.vo';
import { WordVO } from '../../../domain/model/vos/word.vo';

describe('Update offensive word Use Case', () => {
  let updateOffensiveWordUseCase: UpdateOffensiveWordUseCase;
  let offensiveWordRepositoryMongo: OffensiveWordRepositoryMongo;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateOffensiveWordUseCase,
        OffensiveWordService,
        OffensiveWordRepositoryMongo,
      ],
    }).compile();

    updateOffensiveWordUseCase = moduleRef.get<UpdateOffensiveWordUseCase>(
      UpdateOffensiveWordUseCase,
    );

    offensiveWordRepositoryMongo = moduleRef.get<OffensiveWordRepositoryMongo>(
      OffensiveWordRepositoryMongo,
    );
  });
  it('should update offensive word complete', async () => {
    await updateOffensiveWordUseCase.execute(
      'eecfe194-5d2e-4940-b69e-71050257df02',
      {
        word: 'Mod',
        level: 3,
      },
    );
    expect(offensiveWordRepositoryMongo.update).toHaveBeenCalled();
  });
});

jest.mock(
  './../../../infrastructure/repositories/offensive-word.repository.mongo',
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
          update: jest.fn(),
        };
      }),
    };
  },
);
