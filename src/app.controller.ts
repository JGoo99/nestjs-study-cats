import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @Get('test-error')
  throwError() {
    throw new HttpException('TestError', HttpStatus.BAD_REQUEST);
  }
}
