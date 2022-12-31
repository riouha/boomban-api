import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async sarchPosts() {
    return this.postRepo.find({
      where: { type: In(['Post', 'RssPost']), status: 'Published' },
      order: { publishDate: 'DESC' },
    });
  }
}
