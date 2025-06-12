import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

//요청을 처리하고 응답을 리턴

@Controller()
export class PostController {
    constructor(private postService: PostService) {}

    @Get('/posts')
    getPosts() {
        return this.postService.getPosts();
    }
}
