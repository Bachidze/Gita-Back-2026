import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/decorator/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'პოსტის შექმნა', description: 'პოსტი მიბმულია JWT-ის userId-ზე' })
  @ApiResponse({ status: 201, description: 'შექმნილი პოსტი' })
  @ApiResponse({ status: 400, description: 'ტოკენი არ არის ან არავალიდურია' })
  create(@User() userId,@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(userId,createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'ყველა პოსტი', description: 'აბრუნებს პოსტებს populate-ებული user-ით' })
  @ApiResponse({ status: 200, description: 'პოსტების სია' })
  findAll() {
    return this.postsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'ერთი პოსტი ID-ით' })
  @ApiParam({ name: 'id', description: 'პოსტის id' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'პოსტის განახლება' })
  @ApiParam({ name: 'id', description: 'პოსტის id' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'პოსტის წაშლა' })
  @ApiParam({ name: 'id', description: 'პოსტის id' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
