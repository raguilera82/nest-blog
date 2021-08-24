import { Injectable } from '@nestjs/common';
import { AuthorService } from './../../../domain/services/author.service';
import { IdVO } from '../../../domain/model/vos/id.vo';
import { NameAuthorVO } from '../../../domain/model/vos/name-author.vo';
import { NicknameVO } from '../../../domain/model/vos/nickname.vo';
import {
  Author,
  AuthorType,
} from './../../../domain/model/entities/author.entity';

@Injectable()
export class CreateAuthorUseCase {
  constructor(private authorService: AuthorService) {}

  async execute(request: CreateAuthorRequest): Promise<void> {
    const authorData: AuthorType = {
      id: IdVO.create(),
      name: NameAuthorVO.create(request.name),
      nickname: NicknameVO.create(request.nickname),
    };

    const author = new Author(authorData);
    await this.authorService.create(author);
  }
}

export type CreateAuthorRequest = {
  name: string;
  nickname: string;
};
