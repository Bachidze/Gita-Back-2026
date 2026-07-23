import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()

export class AppController {
  constructor(private readonly appService: AppService) {}

  
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Get()
  // getUser(){
  //   // return {name:"giorgi",age:22}
  //   return 10 +5
  // }


  @Get()
  getInfo(){
    return this.appService.getUser()
  }

  @Get("/calc")
  getSum(){
    return this.appService.calcNum(10,5)
  }

}


