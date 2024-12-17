// src/file/file.controller.ts
import {
    Controller,
    Post,
    Get,
    Param,
    Res,
    UploadedFile,
    UseInterceptors,
    Body,
    BadRequestException
} from '@nestjs/common';
import multer, { Multer } from 'multer';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileService } from './file.service';
import { File } from '../Entity/file.entity';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const filename = `${Date.now()}-${file.originalname}`;
                cb(null, filename);
            },
        }),
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File,
                     @Body('offerId') offerId: number,
                     @Body('candidateId') candidateId: number) {
        if (!file) {
            throw new BadRequestException('File is required');
        }
        if (!offerId) {
            throw new BadRequestException('Offer ID is required');
        }

        return this.fileService.createFile(file.filename, file.originalname, file.path, offerId,candidateId);
    }


    @Get('download/:id')
    async downloadFile(@Param('id') id: number, @Res() res: Response) {
        const file: File = await this.fileService.getFile(id);
        return res.sendFile(join(process.cwd(), file.path));
    }

    @Get('downloads')
    async getAllFiles(): Promise<File[]> {
        return this.fileService.getAllFiles();
    }

    @Get('candidates/:id')
    async getCandidates(@Param('id') id :number): Promise<File[]> {
        return this.fileService.getCandidates(id);
    }
}
