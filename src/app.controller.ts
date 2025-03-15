import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

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
