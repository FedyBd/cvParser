import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Put, NotFoundException} from '@nestjs/common';
import { JobDescriptionService } from './job-description.service';
import { CreateJobDescriptionDto } from './dto/create-job-description.dto';
import { UpdateJobDescriptionDto } from './dto/update-job-description.dto';
import Request from 'express';
@Controller('job-description')
export class JobDescriptionController {
  constructor(private readonly jobDescriptionService: JobDescriptionService) {}

  @Post()
  create(@Body() createJobDescriptionDto: CreateJobDescriptionDto) {
    return this.jobDescriptionService.create(createJobDescriptionDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.jobDescriptionService.findAll(request);
  }

  @Get('/recruiter')
  findOne(@Req() request: Request) {
    return this.jobDescriptionService.findById(request);
  }

  @Get('/offer/:id')
  findOneOffer(@Param('id') id: string) {
    return this.jobDescriptionService.findOffer(+id);
  }

  @Get('/check/:offerId/:candidateId')
  check(@Param('offerId') offerId: number,@Param('candidateId') candidateId: number) {
    return this.jobDescriptionService.check(offerId,candidateId);
  }

  @Put(':id')
  async updateJobDescription(
      @Param('id') id: number,
      @Body() updateJobDescriptionDto: UpdateJobDescriptionDto
  ) {
    const updatedJobDescription = await this.jobDescriptionService.update(id, updateJobDescriptionDto);
    if (!updatedJobDescription) {
      throw new NotFoundException(`Job Description with ID ${id} not found`);
    }
    return updatedJobDescription;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDescriptionDto: UpdateJobDescriptionDto) {
    return this.jobDescriptionService.update(+id, updateJobDescriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobDescriptionService.remove(+id);
  }
}
