// src/file/file.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../Entity/file.entity';
import {JobDescriptionService} from "../job-description/job-description.service";
import {JobDescription} from "../job-description/entities/job-description.entity";
import {User} from "../users/entities/user.entity";
import { HttpService } from '@nestjs/axios';
import {lastValueFrom} from "rxjs";


@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
        @InjectRepository(JobDescription)
        private readonly jobDescriptionRepository: Repository<JobDescription>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly httpService: HttpService,
    ) {}

    private flaskServerUrl = 'http://localhost:5000';

    async createFile(filename: string, originalName: string, path: string, jobDescriptionId: number,candidateId:number): Promise<File> {
        // Fetch the job description entity by ID
        const jobDescription = await this.jobDescriptionRepository.findOne({ where: { id: jobDescriptionId } });
        const user=await this.userRepository.findOne({where:{id:candidateId}})
        if (!jobDescription) {
            throw new Error(`JobDescription with ID ${jobDescriptionId} not found`);
        }

        // Create a new File entity instance
        const file = this.fileRepository.create({
            filename,
            originalName,
            path,
            jobDescription,
            user
        });
        // Save the File entity to the database and get the saved entity back
        const savedFile = await this.fileRepository.save(file);

        // Retrieve the ID of the saved file
        const fileId = savedFile.id;

        const absolutePath='C:\\Users\\MED_Fedi_BOUABID\\WebstormProjects\\tanit\\api\\uploads\\'+filename;
        this.sendPathToFlaskServer(absolutePath,fileId,jobDescriptionId);

        return savedFile
    }

    async getFile(id: number): Promise<File> {
        return this.fileRepository.findOneBy({ id });
    }

    async getAllFiles(): Promise<File[]> {
        return this.fileRepository.find();
    }

    getCandidates(id: number) {
        return this.fileRepository.find({where:{jobDescriptionId:id}});
    }

    async sendPathToFlaskServer(path: string,candidateId:number,offerId:number): Promise<void> {
        try {
            const response = await lastValueFrom(
                this.httpService.post('http://localhost:5000/test', { file_path: path, userId:candidateId, offerId:offerId })
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error sending file path to Flask server", error);
        }
    }
}
