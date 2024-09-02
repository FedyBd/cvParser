import { Injectable } from '@nestjs/common';
import { CreateCvdetailDto } from './dto/create-cvdetail.dto';
import { UpdateCvdetailDto } from './dto/update-cvdetail.dto';

@Injectable()
export class CvdetailsService {
  create(createCvdetailDto: CreateCvdetailDto) {
    return 'This action adds a new cvdetail';
  }

  findAll() {
    return `This action returns all cvdetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cvdetail`;
  }

  update(id: number, updateCvdetailDto: UpdateCvdetailDto) {
    return `This action updates a #${id} cvdetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} cvdetail`;
  }
}
