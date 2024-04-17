import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // http://localhost:3000/api/profile
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  getProfile(): string {
    return this.appService.getProfile();
  }
}
