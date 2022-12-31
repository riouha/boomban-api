import { Post } from 'src/modules/post/entities/post.entity';
import { IRssNewsService } from './rss-news-service.interface';
import * as Parser from 'rss-parser';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FardayeEghtesadRssNewsService implements IRssNewsService {
  URL = 'https://www.fardayeeghtesad.com/rss/tp/71';
  NAME = 'فردای اقتصاد';
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async getNews() {
    const parser = new Parser();
    const rss = await parser.parseURL(this.URL);
    const existing = await this.getExistingLinks();

    const posts: Post[] = [];
    for (let i = 0; i < rss.items.length; i++) {
      if (existing.has(rss.items[i].link)) continue;
      const post = new Post();
      post.source = this.NAME;
      post.status = 'Published';
      post.type = 'RssPost';
      post.title = rss.items[i].title;
      post.slug = rss.items[i].title;
      post.link = rss.items[i].link;
      post.thumbnail = rss.items[i].enclosure?.url;
      post.publishDate = rss.items[i].isoDate ? new Date(rss.items[i].isoDate) : new Date();
      posts.push(post);
    }

    return posts;
  }

  private async getExistingLinks() {
    const postLinks = await this.postRepo.find({ where: { source: this.NAME }, select: ['link'] });
    return new Set(postLinks.map((x) => x.link));
  }

  async saveNews() {
    const news = await this.getNews();
    console.log('added news', news.length);
    return this.postRepo.save(news);
  }
}
