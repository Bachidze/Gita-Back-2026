import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { last } from 'rxjs';

@Injectable()
export class PostsService {

  posts = [
    {id:1,title:"title1",content:"content1"},
    {id:2,title:"title2",content:"content2"},
    {id:3,title:"title3",content:"content3"},
    {id:4,title:"title4",content:"content4"},
    {id:5,title:"title5",content:"content5"},
  ]

  create(createPostDto: CreatePostDto) {
    const lsatId = this.posts[this.posts.length - 1]?.id || 0

    let newPost = {
      id:lsatId + 1,
      title:createPostDto.title,
      content:createPostDto.content
    }

    this.posts.push(newPost)

    return newPost
  }

  findAll() {
    return this.posts
  }

  findOne(id: number) {
    let post = this.posts.find(el => el.id == id)
    if(!post) throw new NotFoundException()
    return post
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const index = this.posts.findIndex(el => el.id === id)
    if(index === -1) throw new BadGatewayException()

      this.posts[index] = {
        ...this.posts[index],
        title:updatePostDto.title || this.posts[index].title,
        content:updatePostDto.content || this.posts[index].content
      }
      return this.posts[index]
  }

  remove(id: number) {
    const index = this.posts.findIndex(el => el.id === id)
    if(index === -1) throw new BadGatewayException()
      let deletePosts = this.posts.splice(index,1)
    return  deletePosts
  }
}
