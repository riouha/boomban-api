import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';

@Injectable()
export class FileService {
  constructor(@InjectRepository(File) private readonly fileRepo: Repository<File>) {}
}
