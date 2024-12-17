import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { CreateJobDescriptionDto } from './dto/create-job-description.dto';
import { UpdateJobDescriptionDto } from './dto/update-job-description.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {JobDescription} from "./entities/job-description.entity";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {File} from "../Entity/file.entity"
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class JobDescriptionService {

  constructor(@InjectRepository(JobDescription)
              private jobDescriptionRepository: Repository<JobDescription>,
              @InjectRepository(User)
              private userRepository: Repository<User>,
              @InjectRepository(File)
              private fileRepository: Repository<File>,
              private jwtService: JwtService) {
  }
  async create(createJobDescriptionDto: CreateJobDescriptionDto): Promise<JobDescription> {
    const { jobTitle, ownerId, jobDescription,requiredSkills, experienceRequiredInYears } = createJobDescriptionDto;
    const owner = await this.userRepository.findOneBy({ id: ownerId });

    const jobDes = new JobDescription();
    jobDes.jobTitle = jobTitle;
    jobDes.owner = owner;
    jobDes.jobDescription = jobDescription;
    jobDes.requiredSkills=requiredSkills;
    jobDes.experienceRequiredInYears =experienceRequiredInYears;
    return this.jobDescriptionRepository.save(jobDes);
  }

  async findAll(request) {
    try {
      const cookie = request.cookies['access_token'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }
      return await this.jobDescriptionRepository.find();
    } catch(e){
      throw new UnauthorizedException(e);
    }
  }

  async findById(request) {
    try {
      const cookie = request.cookies['access_token'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      return await this.jobDescriptionRepository.find({ where: { ownerId: data['sub'] } });

    } catch(e){
        throw new UnauthorizedException(e);
    }
  }

  findOffer(id: number) {
    return this.jobDescriptionRepository.findOneBy({ id: id });
  }

  async update(id: number, updateJobDescriptionDto: UpdateJobDescriptionDto): Promise<JobDescription> {
    const jobDescription = await this.jobDescriptionRepository.findOne({ where: { id } });

    if (!jobDescription) {
      throw new NotFoundException(`Job Description with ID ${id} not found`);
    }

    // Update the entity with new values
    Object.assign(jobDescription, updateJobDescriptionDto);

    // Save the updated entity
    return this.jobDescriptionRepository.save(jobDescription);
  }

  remove(id: number) {
    return `This action removes a #${id} jobDescription`;
  }

  async check(offerId: number, candidateId: number) {
    const offer= await this.jobDescriptionRepository.findOneBy({ id: offerId });
    const user= await this.userRepository.findOneBy({id:candidateId});
    const file= await this.fileRepository.findOne({where: {jobDescriptionId:offerId,userId:candidateId}});
    return {
      file:file,
      bool:!!file,
    };
  }
}
