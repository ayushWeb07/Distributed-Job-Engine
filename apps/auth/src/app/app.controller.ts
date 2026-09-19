import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    const data = this.appService.getData();

    return {
      success: true,
      message: 'Successfully fetched all the users',
      data,
    };
  }
}
