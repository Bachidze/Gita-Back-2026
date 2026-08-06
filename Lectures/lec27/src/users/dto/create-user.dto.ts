import {IsEmail, IsNotEmpty, IsNumber, IsString, Length, Max, max} from "class-validator"
export class CreateUserDto {
    @IsString()
    @Length(2,20)
    @IsNotEmpty()
    firstName!:string

    @IsString()
    @Length(2,20)
    @IsNotEmpty()
    lastName!:string

    @IsString()
    @Length(7,30)
    @IsNotEmpty()
    @IsEmail()
    email!:string

    @IsNumber()
    @IsNotEmpty()
    @Max(30)
    age!:number
}
