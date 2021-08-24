import { OffensiveWordRepositoryMongo } from './../../infrastructure/repositories/offensive-word.repository.mongo';
import { Injectable } from '@nestjs/common';
import { ExceptionWithCode } from '../model/exception-with-code';
import { IdVO } from '../model/vos/id.vo';
import { LevelVO } from '../model/vos/level.vo';
import { WordVO } from '../model/vos/word.vo';
import {
  OffensiveWord,
  OffensiveWordType,
} from '../model/entities/offensive-word.entity';

@Injectable()
export class OffensiveWordService {
  constructor(private offensiveWordRepository: OffensiveWordRepositoryMongo) {}

  async persist(offensiveWord: OffensiveWordType): Promise<void> {
    const offensiveWordEntity = new OffensiveWord(offensiveWord);
    await this.offensiveWordRepository.save(offensiveWordEntity);
  }

  async getAll(): Promise<OffensiveWord[]> {
    return this.offensiveWordRepository.getAll();
  }

  async getById(id: IdVO): Promise<OffensiveWord | null> {
    return this.offensiveWordRepository.getById(id);
  }

  async delete(id: IdVO): Promise<void> {
    const offensiveWord = await this.checkIfIDExits(id);
    await this.offensiveWordRepository.delete(offensiveWord.id);
  }

  async update(offensiveWord: OffensiveWord): Promise<void> {
    const offensiveWordOriginal = await this.checkIfIDExits(offensiveWord.id);

    const offensiveWordMerge: OffensiveWordType = {
      id: offensiveWord.id,
      word: WordVO.create(
        offensiveWord.word.value ?? offensiveWordOriginal?.word.value,
      ),
      level: LevelVO.create(
        offensiveWord.level.value ?? offensiveWordOriginal?.level.value,
      ),
    };
    await this.offensiveWordRepository.update(
      new OffensiveWord(offensiveWordMerge),
    );
  }

  private async checkIfIDExits(id: IdVO): Promise<OffensiveWord> {
    const offensiveWordDB = await this.getById(id);
    if (!offensiveWordDB) {
      throw new ExceptionWithCode(404, `Id Not Found: ${id.value}`);
    }
    return offensiveWordDB;
  }
}
