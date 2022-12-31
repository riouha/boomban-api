import { Post } from '../../post/entities/post.entity';
export interface IRssNewsService {
  URL: string;
  NAME: string;
  getNews: () => Promise<Post[]>;
}
