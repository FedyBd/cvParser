import { Test, TestingModule } from '@nestjs/testing';
import { CvdetailsService } from './cvdetails.service';

describe('CvdetailsService', () => {
  let service: CvdetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvdetailsService],
    }).compile();

    service = module.get<CvdetailsService>(CvdetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
