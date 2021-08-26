import { UserService } from './user.service';
import { PostService } from './post.service';
import { OffensiveWordService } from './offensive-word.service';
import { AuthorService } from './author.service';

export const Services = [
  AuthorService,
  OffensiveWordService,
  PostService,
  UserService,
];
