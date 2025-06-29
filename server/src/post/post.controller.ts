import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

//요청을 처리하고 응답을 리턴

@Controller()
export class PostController {
    constructor(private postService: PostService) {}

    @Get('/posts')
    getPosts(@Query('page') page: number) {
        return this.postService.getPosts(page);
    }

    @Get('/posts/:id')
    getPostById(@Param('id', ParseIntPipe) id: number) {
        return this.postService.getPostById(id);
    }

    @Post('/posts')
    createPost(@Body() createPostDto: CreatePostDto) {
        return this.postService.createPost(createPostDto);
    }   

    @Delete('/posts/:id')
    deletePost(@Param('id', ParseIntPipe) id: number) {
        return this.postService.deletePost(id);
    }
}
