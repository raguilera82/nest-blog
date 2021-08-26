import { CreatePostUseCase } from './posts/create-post.usecase';
import { UpdateOffensiveWordUseCase } from './offensive-word/update-offensive-word.usecase';
import { GetAllOffensiveWordsUseCase } from './offensive-word/get-all-offensive-word.usecase';
import { DeleteOffensiveWordUseCase } from './offensive-word/delete-offensive-word.usecase';
import { CreateOffensiveWordUseCase } from './offensive-word/create-offensive-word.usecase';
import { DeleteCommentUseCase } from './comments/delete-comment.usecase';
import { AddCommentUseCase } from './comments/add-comment.usecase';
import { CreateAuthorUseCase } from './authors/create-author.usecase';
import { SignUpAuthorUseCase } from './auth/sign-up-author.usecase';
import { SignUpUseCase } from './auth/sign-up.usecase';
import { SignInUseCase } from './auth/sign-in.usecase';

export const UsesCases = [
  SignInUseCase,
  SignUpUseCase,
  SignUpAuthorUseCase,
  CreateAuthorUseCase,
  AddCommentUseCase,
  DeleteCommentUseCase,
  CreateOffensiveWordUseCase,
  DeleteOffensiveWordUseCase,
  GetAllOffensiveWordsUseCase,
  UpdateOffensiveWordUseCase,
  CreatePostUseCase,
];
