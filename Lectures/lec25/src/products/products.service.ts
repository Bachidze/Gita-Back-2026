import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  products = [
    {
      id:1,
      name:"iphone",
      price:4000
    },
    {
      id:2,
      name:"samsung",
      price:3500
    },
    {
      id:3,
      name:"Nokia",
      price:3000
    },
  ]

  create(createProductDto: CreateProductDto) {
    const lastId = this.products[this.products.length - 1]?.id || 0

    const newProducts = {
      id:lastId + 1,
      name:createProductDto.name,
      price:createProductDto.price
    }

    this.products.push(newProducts)
    
    return newProducts
  }

  findAll() {
    return this.products
  }

  findOne(id: number) {
    const findProductById = this.products.find(el => el.id === id)
    if(!findProductById) throw new NotFoundException()
    return findProductById
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex(el => el.id === id)
    if(index === -1) throw new BadRequestException()

      this.products[index] = {
        ...this.products[index],
        name:updateProductDto.name || this.products[index].name,
        price: updateProductDto.price || this.products[index].price

      }

    return this.products[index]
  }

  remove(id: number) {
    const index = this.products.findIndex(el => el.id === id)
    if(index === -1) throw new BadRequestException()
      const deleteProduct = this.products.splice(index,1)
    return deleteProduct
  }
}
