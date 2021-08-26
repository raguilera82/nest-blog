import {
  OffensiveWordMongo,
  OffensiveWordDocument,
} from './offensive-word.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  OffensiveWord,
  OffensiveWordType,
} from '../../domain/model/entities/offensive-word.entity';
import { IdVO } from '../../domain/model/vos/id.vo';
import { LevelVO } from '../../domain/model/vos/level.vo';
import { WordVO } from '../../domain/model/vos/word.vo';
import { OffensiveWordRepository } from '../../domain/repositories/offensive-word.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OffensiveWordRepositoryMongo implements OffensiveWordRepository {
  constructor(
    @InjectModel(OffensiveWordMongo.name)
    private offensiveWordModel: Model<OffensiveWordDocument>,
  ) {}

  async update(offensiveWord: OffensiveWord): Promise<void> {
    await this.offensiveWordModel.findOneAndUpdate(
      { id: offensiveWord.id.value },
      { word: offensiveWord.word.value, level: offensiveWord.level.value },
    );
  }

  async getAll(): Promise<OffensiveWord[]> {
    const allOffensiveWords = await this.offensiveWordModel.find({}).exec();
    return allOffensiveWords.map((ofModel) => {
      const offensiveWordData: OffensiveWordType = {
        id: IdVO.createWithUUID(ofModel.id),
        level: LevelVO.create(ofModel.level),
        word: WordVO.create(ofModel.word),
      };
      return new OffensiveWord(offensiveWordData);
    });
  }

  async getById(id: IdVO): Promise<OffensiveWord | null> {
    const offensiveWordDB = await this.offensiveWordModel
      .findOne({
        id: id.value,
      })
      .exec();

    if (!offensiveWordDB) {
      return null;
    }

    return this.createOffensiveWord(offensiveWordDB);
  }

  async getByWord(word: WordVO): Promise<OffensiveWord | null> {
    const offensiveWordDB = await this.offensiveWordModel
      .findOne({
        word: word.value,
      })
      .exec();

    if (!offensiveWordDB) {
      return null;
    }

    return this.createOffensiveWord(offensiveWordDB);
  }

  async save(offensiveWord: OffensiveWord): Promise<void> {
    const newOffensiveWord = {
      id: offensiveWord.id.value,
      word: offensiveWord.word.value,
      level: offensiveWord.level.value,
    };
    const offensiveWordModel = new this.offensiveWordModel(newOffensiveWord);
    await offensiveWordModel.save();
  }

  async delete(id: IdVO): Promise<void> {
    await this.offensiveWordModel.findOneAndRemove({ id: id.value });
  }

  async deleteAll(): Promise<void> {
    await this.offensiveWordModel.deleteMany({});
  }

  private createOffensiveWord(offensiveWordDB: any) {
    const offensiveWordData: OffensiveWordType = {
      id: IdVO.createWithUUID(offensiveWordDB.id),
      word: WordVO.create(offensiveWordDB.word),
      level: LevelVO.create(offensiveWordDB.level),
    };

    return new OffensiveWord(offensiveWordData);
  }
}
