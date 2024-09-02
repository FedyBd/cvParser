import { Module } from '@nestjs/common';
import { CvdetailsService } from './cvdetails.service';
import { CvdetailsController } from './cvdetails.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {File} from "../Entity/file.entity";
import {CvDetails} from "./entities/cvdetail.entity";

@Module({
  imports:[TypeOrmModule.forFeature([File,CvDetails]),],
  controllers: [CvdetailsController],
  providers: [CvdetailsService],
})
export class CvdetailsModule {}
