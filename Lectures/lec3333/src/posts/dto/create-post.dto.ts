import { ApiProperty } from "@nestjs/swagger"
import {IsNotEmpty, IsString, Length} from "class-validator"
export class CreatePostDto {
    
    @ApiProperty({ example: 'My first post', description: 'პოსტის სათაური' })
    @IsNotEmpty()
    @IsString()
    @Length(1,250)
    title!:string

    @ApiProperty({ example: 'Hello from NestJS', description: 'პოსტის ტექსტი' })
    @IsNotEmpty()
    @IsString()
    @Length(1,250)
    content!:string
}
