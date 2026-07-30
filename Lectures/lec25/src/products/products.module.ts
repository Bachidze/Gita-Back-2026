import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UserAgent } from 'middleware/userAgent.middleware';
import path from 'path';
import { AuthMidlleware } from 'middleware/Auth.middleware';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer  
    //     // .apply(UserAgent)
    //     // .exclude({path:"products",method:RequestMethod.POST})
    //     // .forRoutes(ProductsController)


    consumer
      .apply(AuthMidlleware)
      .forRoutes({path:"products",method:RequestMethod.POST})

  }
}
