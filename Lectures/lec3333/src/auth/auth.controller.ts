import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './DTO/sign-up.dto';
import { SignInDto } from './DTO/sing-in.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from 'src/decorator/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/sign-up")
  @ApiOperation({ summary: 'რეგისტრაცია', description: 'ახალი მომხმარებლის შექმნა ჰეშირებული პაროლით' })
  @ApiResponse({ status: 201, description: 'user created successfully' })
  @ApiResponse({ status: 400, description: 'ელფოსტა უკვე არსებობს ან ვალიდაცია ვერ გაიარა' })
  singUp(@Body() body:SingUpDto){
    
    return this.authService.signUp(body)
  }

  @Post("/sign-in")
  @ApiOperation({ summary: 'ავტორიზაცია', description: 'აბრუნებს JWT access token-ს (1 საათი)' })
  @ApiResponse({ status: 201, description: 'JWT access token' })
  @ApiResponse({ status: 502, description: 'არასწორი მონაცემები ან ანგარიში არ არსებობს' })
  signIn(@Body() body:SignInDto){
    return this.authService.signIn(body)
  }

  @UseGuards(AuthGuard)
  @Get("/current-user")
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'მიმდინარე მომხმარებელი', description: 'აბრუნებს JWT-ში არსებული userId-ის იუზერს' })
  @ApiResponse({ status: 200, description: 'მიმდინარე იუზერის მონაცემები' })
  @ApiResponse({ status: 400, description: 'ტოკენი არ არის ან არავალიდურია' })
  currentUser(@User() userId){
    return this.authService.currnetUser(userId)
  }
}

