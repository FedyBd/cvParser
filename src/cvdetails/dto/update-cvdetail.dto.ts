import { PartialType } from '@nestjs/mapped-types';
import { CreateCvdetailDto } from './create-cvdetail.dto';

export class UpdateCvdetailDto extends PartialType(CreateCvdetailDto) {}
