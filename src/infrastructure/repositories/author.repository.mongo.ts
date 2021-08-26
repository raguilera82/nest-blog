import { Injectable } from '@nestjs/common';
import { AuthorMongo, AuthorDocument } from './author.schema';
import { AuthorType } from './../../domain/model/entities/author.entity';
import { Author } from '../../domain/model/entities/author.entity';
import { NicknameVO } from '../../domain/model/vos/nickname.vo';
import { AuthorRepository } from '../../domain/repositories/author.repository';
import { IdVO } from '../../domain/model/vos/id.vo';
import { NameAuthorVO } from '../../domain/model/vos/name-author.vo';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthorRepositoryMongo implements AuthorRepository {
  constructor(
    @InjectModel(AuthorMongo.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async searchByNickname(nickname: NicknameVO): Promise<Author | null> {
    const authorDB = await this.authorModel
      .findOne({
        nickname: nickname.value,
      })
      .exec();

    if (!authorDB) {
      return null;
    }

    const authorData: AuthorType = {
      id: IdVO.createWithUUID(authorDB.id),
      name: NameAuthorVO.create(authorDB.name),
      nickname: NicknameVO.create(authorDB.nickname),
    };

    return new Author(authorData);
  }

  async searchById(id: IdVO): Promise<Author | null> {
    const authorDB: any = await this.authorModel
      .findOne({ id: id.value })
      .exec();

    if (!authorDB) {
      return null;
    }

    const authorData: AuthorType = {
      id: IdVO.createWithUUID(authorDB.id),
      name: NameAuthorVO.create(authorDB.name),
      nickname: NicknameVO.create(authorDB.nickname),
    };

    return new Author(authorData);
  }

  async persist(author: Author): Promise<void> {
    const docAuthor = {
      id: author.id.value,
      name: author.name.value,
      nickname: author.nickname.value,
    };
    const authorModel = new this.authorModel(docAuthor);
    await authorModel.save();
  }

  async deleteById(id: IdVO): Promise<void> {
    await this.authorModel.findOneAndDelete({ id: id.value });
  }

  async deleteAll(): Promise<void> {
    await this.authorModel.deleteMany({});
  }
}
