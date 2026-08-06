import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel:Model<User>){}

 async create(createUserDto: CreateUserDto) {
  const exsistingUser = await this.userModel.findOne({email:createUserDto.email})
  if(exsistingUser) throw new BadRequestException()
    const newUser = await this.userModel.create(createUserDto)
    return newUser
  }

async  findAll() {
    return this.userModel.find()
  }

 async findOne(id: string) {
  if(!isValidObjectId(id)) throw new BadRequestException()
    const findUserById = await this.userModel.findById(id)
  if(!findUserById) throw new NotFoundException()
    return findUserById
  }

async  update(id: string, updateUserDto: UpdateUserDto) {
  if(!isValidObjectId(id)) throw new BadRequestException()
    const updateUserById = await this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true})
  if(!updateUserById) throw new NotFoundException()
    return updateUserById
  }

async remove(id: string) {
  if(!isValidObjectId(id)) throw new BadRequestException()
    const deletedUSerByID = await this.userModel.findByIdAndDelete(id)
  if(!deletedUSerByID) throw new NotFoundException()
    return deletedUSerByID
  }
}
