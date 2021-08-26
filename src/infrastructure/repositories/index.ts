import { UserRepositoryPG } from './user.repository.pg';
import { PostRepositoryMongo } from './post.repository.mongo';
import { OffensiveWordRepositoryMongo } from './offensive-word.repository.mongo';
import { AuthorRepositoryMongo } from './author.repository.mongo';

export const Repositories = [
  AuthorRepositoryMongo,
  OffensiveWordRepositoryMongo,
  PostRepositoryMongo,
  UserRepositoryPG,
];
