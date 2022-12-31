import { Controller, Get } from '@nestjs/common';
import { RssService } from './services/rss.service';

@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Get('/test')
  async test() {
    return this.rssService.test();
  }
}
