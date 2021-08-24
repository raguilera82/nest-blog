import { Injectable } from '@nestjs/common';
import { IdVO } from '../../../domain/model/vos/id.vo';
import { OffensiveWordService } from '../../../domain/services/offensive-word.service';
import { IdRequest } from './../id.request';

@Injectable()
export class DeleteOffensiveWordUseCase {
  constructor(private offensiveWordService: OffensiveWordService) {}

  async execute(idRequest: IdRequest): Promise<void> {
    const id = IdVO.createWithUUID(idRequest);

    await this.offensiveWordService.delete(id);
  }
}
