import { ApiProperty } from "@nestjs/swagger"
import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator"
export class CreateUserDto {

  @ApiProperty({ example: 'Giorgi Bachidze', description: 'მომხმარებლის სახელი და გვარი' })
  @IsNotEmpty()
  @IsString()
  @Length(1,25)
  fullName!:string


  @ApiProperty({ example: 'giorgi@example.com', description: 'უნიკალური ელფოსტა' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!:string


  @ApiProperty({ example: 'secret123', minLength: 6, maxLength: 20, description: 'პაროლი (6-20 სიმბოლო)' })
  @IsNotEmpty()
  @IsString()
  @Length(6,20)
  password!:string
}
