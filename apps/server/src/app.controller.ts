import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  // api router should before the frontend router

  @Get('/health-check')
  healthCheck() {
    return 'ok';
  }

  // This is the main route that will be used to serve the frontend
  @Get('/*')
  @Render('index.hbs')
  getIndex() {
    return {};
  }
}
