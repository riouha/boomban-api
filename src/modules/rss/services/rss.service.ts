import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { FardayeEghtesadRssNewsService } from './fardaye-eghtesad';

@Injectable()
export class RssService {
  constructor(private readonly fardayeEghtesadService: FardayeEghtesadRssNewsService) {}
  async test() {
    const parser = new Parser();
    //0 http://news.mrud.ir/rss?pl=4
    //1 https://www.fardayeeghtesad.com/rss/tp/71
    //2 https://www.eghtesadonline.com/fa/feeds/?p=Y2F0ZWdvcmllcz0xMA%2C%2C  tag
    //3 https://donya-e-eqtesad.com/fa/feeds/?p=Y2F0ZWdvcmllcz0xOA%2C%2C tag,image
    //4 https://www.melkana.com/blog/feed/
    //5 https://www.eghtesadnews.com/fa/feeds/?p=Y2F0ZWdvcmllcz0xOQ%2C%2C
    //6 https://ecoiran.com/fa/feeds/?p=Y2F0ZWdvcmllcz0xNDc%2C
    //7
    const rss = await parser.parseURL('https://www.fardayeeghtesad.com/rss/tp/71');
    // const rss = await this.fardayeEghtesadService.saveNews();
    return rss;
  }
}
