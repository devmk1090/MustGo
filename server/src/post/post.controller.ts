import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

//요청을 처리하고 응답을 리턴

@Controller()
export class PostController {
    constructor(private postService: PostService) {}

    @Get('/posts')
    getPosts() {
        return this.postService.getPosts
        ();
    }

    @Post('/posts')
    createPost(@Body() createPostDto: CreatePostDto) {
        return this.postService.createPost();
    }
}
