import {IsNotEmpty, IsString, Length} from "class-validator"
export class CreatePostDto {
    
    @IsNotEmpty()
    @IsString()
    @Length(1,250)
    title!:string

    @IsNotEmpty()
    @IsString()
    @Length(1,250)
    content!:string
}
