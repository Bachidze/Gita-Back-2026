import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {


  getHello(): string {
    return 'Hello World!';
  }


  getUser(){
    return {name:"giorgi",age:22}
  }


  calcNum(a:number,b:number){
    return a+b
  }


  

}
