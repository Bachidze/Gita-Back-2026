import { Injectable } from '@nestjs/common';
import { run } from 'node:test';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }


  getSumNum(){
    return 10+5
  }


  getAnimalsByLang(lang){

    const animals = {
      ka: [
        { id: 1, name: "ცხენი", age: 20, height: 2, weight: 200 },
      ],
    
      en: [
        { id: 2, name: "Horse", age: 20, height: 2, weight: 200 },
      ],
    
      ru: [
        { id: 3, name: "Лошадь", age: 20, height: 2, weight: 200 },
      ],
    
      de: [
        { id: 4, name: "Pferd", age: 20, height: 2, weight: 200 },
      ],
    };

    return animals[lang]
  }

}
