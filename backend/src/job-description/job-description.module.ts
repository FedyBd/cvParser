import { Module } from '@nestjs/common';
import { JobDescriptionService } from './job-description.service';
import { JobDescriptionController } from './job-description.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JobDescription} from "./entities/job-description.entity";
import {User} from "../users/entities/user.entity";
import {File} from "../Entity/file.entity"
import {JwtModule} from "@nestjs/jwt";
@Module({
  imports:[TypeOrmModule.forFeature([JobDescription, User, File]),
    JwtModule.register({
      secret:'osifnqjom@{#@~shejrphqzfezr',
      signOptions: {expiresIn: '10h'}
    })],
  controllers: [JobDescriptionController],
  providers: [JobDescriptionService],
  exports: [JobDescriptionService],
})
export class JobDescriptionModule {}
