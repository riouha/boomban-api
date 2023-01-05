import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './services/file.service';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('file', {
      //   storage: diskStorage({
      //     destination: './files',
      //     filename: editFileName,
      //   }),
      //   fileFilter: imageFileFilter,
    }),
  )
  async uploadImage(
    // @GetUser() token: ITokenPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('no file uploaded');
    const response = {
      id: 1,
      name: file.originalname,
      path: file.filename,
    };
    return response;
  }

  @Get('/:path')
  seeUploadedFile(@Param('path') path: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'uploads', path));
    return new StreamableFile(file, { type: 'image', disposition: 'inline' });

    // return res.sendFile(path, { root: join(__dirname, '../../../uploads') });
  }
}
