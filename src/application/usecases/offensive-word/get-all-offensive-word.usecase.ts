import { Injectable } from '@nestjs/common';
import { OffensiveWord } from '../../../domain/model/entities/offensive-word.entity';
import { OffensiveWordService } from '../../../domain/services/offensive-word.service';
import { OffensiveWordResponse } from './offensive-word.response';

@Injectable()
export class GetAllOffensiveWordsUseCase {
  constructor(private offensiveWordService: OffensiveWordService) {}

  async execute(): Promise<OffensiveWordResponse[]> {
    const offensiveWords: OffensiveWord[] =
      await this.offensiveWordService.getAll();
    const offensiveWordResponse: OffensiveWordResponse[] = offensiveWords.map(
      (of) => {
        return { id: of.id.value, word: of.word.value, level: of.level.value };
      },
    );
    return offensiveWordResponse;
  }
}
