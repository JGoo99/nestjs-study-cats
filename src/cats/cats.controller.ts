import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Post()
  createOne(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `cat ${id}`;
  }

  //   @Patch(':id')
  //   updateOne(@Param('id', ParseIntPipe) id: number, @Body)
}
