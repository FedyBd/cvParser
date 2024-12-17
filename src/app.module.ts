import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {FileModule} from "./file/file.module";
import { JobDescriptionModule } from './job-description/job-description.module';
import { UsersModule } from './users/users.module';
import {JobDescription} from "./job-description/entities/job-description.entity";
import {User} from "./users/entities/user.entity";
import {File} from "./Entity/file.entity"
import {JwtModule} from "@nestjs/jwt";
import { CvdetailsModule } from './cvdetails/cvdetails.module';
import {CvDetails} from "./cvdetails/entities/cvdetail.entity";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: 'cvs',
      username: 'root',
      password: '',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'SFs78oijcCk64SCG89skdcs@@#[@`~19zD89',
      signOptions: {
        expiresIn: '60m', // Token expiration time
      },
    }),
    TypeOrmModule.forFeature([JobDescription, User, File,CvDetails]),
    FileModule, JobDescriptionModule, UsersModule, CvdetailsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
