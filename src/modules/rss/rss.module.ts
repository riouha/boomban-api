import { Module } from '@nestjs/common';
import { RssService } from './services/rss.service';
import { RssController } from './rss.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { FardayeEghtesadRssNewsService } from './services/fardaye-eghtesad';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), ScheduleModule.forRoot()],
  controllers: [RssController],
  providers: [FardayeEghtesadRssNewsService, RssService],
})
export class RssModule {}
