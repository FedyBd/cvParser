import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CvdetailsService } from './cvdetails.service';
import { CreateCvdetailDto } from './dto/create-cvdetail.dto';
import { UpdateCvdetailDto } from './dto/update-cvdetail.dto';

@Controller('cvdetails')
export class CvdetailsController {
  constructor(private readonly cvdetailsService: CvdetailsService) {}

  @Post()
  create(@Body() createCvdetailDto: CreateCvdetailDto) {
    return this.cvdetailsService.create(createCvdetailDto);
  }

  @Get()
  findAll() {
    return this.cvdetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvdetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvdetailDto: UpdateCvdetailDto) {
    return this.cvdetailsService.update(+id, updateCvdetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvdetailsService.remove(+id);
  }
}
