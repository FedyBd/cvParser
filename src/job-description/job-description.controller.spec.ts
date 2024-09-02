import { Test, TestingModule } from '@nestjs/testing';
import { JobDescriptionController } from './job-description.controller';
import { JobDescriptionService } from './job-description.service';

describe('JobDescriptionController', () => {
  let controller: JobDescriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobDescriptionController],
      providers: [JobDescriptionService],
    }).compile();

    controller = module.get<JobDescriptionController>(JobDescriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
