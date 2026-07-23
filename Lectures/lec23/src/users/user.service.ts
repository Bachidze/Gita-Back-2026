import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDTO } from "./DTO/user.dto";



@Injectable()

export class UserService{


    users = [
        {
            id:1,
            name:"giga"
        },
        {
            id:2,
            name:"gio"
        },
        {
            id:3,
            name:"mariami"
        },
        {
            id:4,
            name:"nini"
        },
        {
            id:5,
            name:"lika"
        },
    ]

    getAllUser(){
        return this.users
    }

    getUserById(id:number){
        let user = this.users.find((el) => el.id === Number(id))
        if(!user) throw new HttpException("not found",HttpStatus.NOT_FOUND)
        return user
    }
    
    createUser(body:UserDTO){
        let lastId = this.users[this.users.length - 1]?.id || 0
        const newObj = {
            id:lastId +1,
            name:body.name,
            age:body.age
        }

        this.users.push(newObj)
        return newObj
    }


    deleteUser(id:number){
        const index = this.users.findIndex(el => el.id === Number(id))

        if(index === -1) throw new HttpException("not found",HttpStatus.NOT_FOUND)
            const deleteUser  =this.users.splice(index,1)

        return  deleteUser
            
    }

}