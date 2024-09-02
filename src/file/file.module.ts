// src/file/file.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { File } from '../Entity/file.entity';
import {JobDescriptionModule} from "../job-description/job-description.module";
import {JobDescription} from "../job-description/entities/job-description.entity";
import {User} from "../users/entities/user.entity";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [TypeOrmModule.forFeature([File,JobDescription,User]),JobDescriptionModule,HttpModule],
    providers: [FileService],
    controllers: [FileController],
})
export class FileModule {}
