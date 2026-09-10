import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/decorator/user.decorator';
import { ISAdminGuard } from 'src/auth/guards/isAdmin.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'ყველა მომხმარებელი' })
  @ApiResponse({ status: 200, description: 'მომხმარებლების სია' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ერთი მომხმარებელი ID-ით' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'მომხმარებელი ნაპოვნია' })
  @ApiResponse({ status: 400, description: 'არავალიდური id' })
  @ApiResponse({ status: 404, description: 'მომხმარებელი ვერ მოიძებნა' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @UseGuards(AuthGuard)
  @Patch()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'საკუთარი პროფილის განახლება' })
  @ApiResponse({ status: 200, description: 'განახლებული მომხმარებელი' })
  update(@User() userId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'საკუთარი ანგარიშის წაშლა' })
  @ApiResponse({ status: 200, description: 'წაშლილი მომხმარებელი' })
  remove(@User() userId) {
    return this.usersService.remove(userId);
  }

  @UseGuards(AuthGuard,ISAdminGuard)
  @Delete(":id")
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'სხვა მომხმარებლის წაშლა (admin)' })
  @ApiParam({ name: 'id', description: 'წასაშლელი მომხმარებლის MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'წაშლილი მომხმარებელი' })
  @ApiResponse({ status: 401, description: 'არ ხარ admin' })
  removeOtherUser(@Param("id") id){
    return this.usersService.remove(id)
  }
}
