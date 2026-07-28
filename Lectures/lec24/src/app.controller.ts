import { Controller, DefaultValuePipe, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/sum")
  getSum(){
    // return 10 + 5
    return this.appService.getSumNum()
  }

  @Get("/animals")
  getAnimalByLang(@Query("lang", new DefaultValuePipe("en")) lang){
    return this.appService.getAnimalsByLang(lang)
  }
}
