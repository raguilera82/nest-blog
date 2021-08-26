import {
  SignUpAuthorUseCase,
  SignUpAuthorRequest,
} from './application/usecases/auth/sign-up-author.usecase';
import { Repositories } from './infrastructure/repositories/index';
import { Middlewares } from './infrastructure/middlewares/index';
import { Services } from './domain/services/index';
import { UsesCases } from './application/usecases/index';
import { Controllers } from './infrastructure/controllers/index';
import { UserService } from './domain/services/user.service';
import { AuthorService } from './domain/services/author.service';
import { GetAllOffensiveWordsUseCase } from './application/usecases/offensive-word/get-all-offensive-word.usecase';
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
import { CreateAuthorUseCase } from './application/usecases/authors/create-author.usecase';
import {
  AddCommentUseCase,
  AddCommentRequest,
} from './application/usecases/comments/add-comment.usecase';
import { CreateOffensiveWordUseCase } from './application/usecases/offensive-word/create-offensive-word.usecase';
import { OffensiveWordResponse } from './application/usecases/offensive-word/offensive-word.response';
import {
  CreatePostUseCase,
  CreatePostRequest,
} from './application/usecases/posts/create-post.usecase';
import { UserType, User } from './domain/model/entities/user.entity';
import { EmailVO } from './domain/model/vos/email.vo';
import { IdVO } from './domain/model/vos/id.vo';
import { NicknameVO } from './domain/model/vos/nickname.vo';
import { PasswordVO } from './domain/model/vos/password.vo';
import { RoleVO, Role } from './domain/model/vos/role.vo';

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
          username: process.env.MONGO_AUTH_USER ?? 'admin',
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
  constructor(
    private getAllOffensiveWordsUseCase: GetAllOffensiveWordsUseCase,
    private createOffensiveWordUseCase: CreateOffensiveWordUseCase,
    private authorService: AuthorService,
    private signUpAuthorUseCase: SignUpAuthorUseCase,
    private userService: UserService,
    private createPostUseCase: CreatePostUseCase,
    private addCommentUseCase: AddCommentUseCase,
  ) {}

  async onModuleInit() {
    /*const offensiveWords: OffensiveWordResponse[] =
      await this.getAllOffensiveWordsUseCase.execute();

    if (offensiveWords.length === 0) {
      this.createOffensiveWordUseCase.execute({ word: 'App', level: 3 });
    }*/

    const userData: UserType = {
      email: EmailVO.create('admin@example.org'),
      password: PasswordVO.create('password'),
      id: IdVO.create(),
      role: RoleVO.create(Role.ADMIN),
    };

    await this.userService.persist(new User(userData));

    const signUpAuthorRequest: SignUpAuthorRequest = {
      email: 'author@example.org',
      nameAuthor: 'Prueba',
      nicknameAuthor: 'Prueba',
      password: 'Prueba',
    };
    await this.signUpAuthorUseCase.execute(signUpAuthorRequest);

    const createPostRequest: CreatePostRequest = {
      authorNickname: 'Prueba',
      content:
        'Contenido de prueba Contenido de prueba Contenido de prueba Contenido de prueba Contenido de prueba',
      title: 'Título de prueba',
    };
    const postId = await this.createPostUseCase.execute(createPostRequest);

    const addCommentRequest: AddCommentRequest = {
      postId: postId.id,
      contentComment: 'Este es el contenido de comentario',
      nicknameComment: 'Prueba',
    };
    await this.addCommentUseCase.execute(addCommentRequest);
  }
}
