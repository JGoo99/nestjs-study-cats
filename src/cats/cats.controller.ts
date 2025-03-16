import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cat-request.dto';
import { SuccessInterceptor } from '../common/logging.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Post()
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized fail',
  })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiOperation({ summary: '회원가입' })
  async createOne(@Body() catDto: CatRequestDto) {
    await this.catsService.signup(catDto);
  }
}
