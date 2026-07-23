import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "./DTO/user.dto";



@Controller()

export class UserController{
    constructor(private readonly userService:UserService){}


    @Get("/users")
    getAllUserInfromation(){
        return this.userService.getAllUser()
    }


    @Get("/users/:id")
    getUserById(@Param() params){

        const id = params.id
        return this.userService.getUserById(id)

    }


    @Post("/users")
    createUser(@Body() body:UserDTO){
        console.log(body)
        return this.userService.createUser(body)
    }

    @Delete("/users/:id")
    deleteUSer(@Param() params){
        const id  = params.id
        return this.userService.deleteUser(id)
    }

}