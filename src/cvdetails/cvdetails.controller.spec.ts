import { Test, TestingModule } from '@nestjs/testing';
import { CvdetailsController } from './cvdetails.controller';
import { CvdetailsService } from './cvdetails.service';

describe('CvdetailsController', () => {
  let controller: CvdetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvdetailsController],
      providers: [CvdetailsService],
    }).compile();

    controller = module.get<CvdetailsController>(CvdetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
