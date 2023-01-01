import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { RssProviders } from '../rss/services/rss-providers';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async sarchPosts() {
    const posts = await this.postRepo.find({
      where: { type: In(['Post', 'RssPost']), status: 'Published' },
      order: { publishDate: 'DESC' },
    });
    return posts.map((post) => {
      if (post.link)
        post['sourceData'] = {
          name: post.source,
          title: RssProviders[post.source].title,
          logo: RssProviders[post.source].logo,
        };
      return post;
    });
  }
}
