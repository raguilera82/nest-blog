import { LevelVO } from './domain/model/vos/level.vo';
import { OffensiveWordType } from './domain/model/entities/offensive-word.entity';
import { OffensiveWordService } from './domain/services/offensive-word.service';
import { Repositories } from './infrastructure/repositories/index';
import { Middlewares } from './infrastructure/middlewares/index';
import { Services } from './domain/services/index';
import { UsesCases } from './application/usecases/index';
import { Controllers } from './infrastructure/controllers/index';
import {
  PostMongo,
  PostSchema,
} from './infrastructure/repositories/post.schema';
import {
  OffensiveWordMongo,
  OffensiveWordSchema,
} from './infrastructure/repositories/offensive-word.schema';
import { UserModel } from './infrastructure/repositories/user.schema';
import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  AuthorMongo,
  AuthorSchema,
} from './infrastructure/repositories/author.schema';
import { WordVO } from './domain/model/vos/word.vo';
import { IdVO } from './domain/model/vos/id.vo';

const hostMongo = process.env.MONGO_HOST ?? 'localhost';
const portMongo = process.env.APP_MONGO_PORT ?? '27018';
const dbNameMongo = process.env.MONGO_DB ?? 'blog';

const userPG = process.env.PG_USER ?? 'pguser';
const passPG = process.env.PG_PASS ?? 'pguser';
const hostPG = process.env.PG_HOST ?? 'localhost';
const portPG = process.env.APP_PG_PORT ?? '5433';
const dbNamePG = process.env.PG_DB_NAME ?? 'pgdb';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${hostMongo}:${portMongo}/${dbNameMongo}`,
      {
        authSource: process.env.MONGO_AUTH_SOURCE ?? 'admin',
        auth: {
          user: process.env.MONGO_AUTH_USER ?? 'admin',
          password: process.env.MONGO_AUTH_PASS ?? 'admin',
        },
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    ),
    MongooseModule.forFeature([
      { name: AuthorMongo.name, schema: AuthorSchema },
      { name: OffensiveWordMongo.name, schema: OffensiveWordSchema },
      { name: PostMongo.name, schema: PostSchema },
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '60d',
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: hostPG,
      port: +portPG,
      username: userPG,
      password: passPG,
      database: dbNamePG,
      sync: { force: true },
      synchronize: true,
      models: [UserModel],
    }),
    SequelizeModule.forFeature([UserModel]),
  ],
  controllers: [AppController, ...Controllers],
  providers: [
    AppService,
    ...UsesCases,
    ...Services,
    ...Middlewares,
    ...Repositories,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private offensiveWordService: OffensiveWordService) {}

  async onModuleInit() {
    const offensiveWords = await this.offensiveWordService.getAll();
    if (offensiveWords.length == 0) {
      const offensiveWord: OffensiveWordType = {
        id: IdVO.create(),
        word: WordVO.create('caca'),
        level: LevelVO.create(3),
      };
      await this.offensiveWordService.persist(offensiveWord);
    }
  }
}
