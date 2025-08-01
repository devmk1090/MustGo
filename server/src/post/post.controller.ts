import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';

//요청을 처리하고 응답을 리턴

@Controller()
@UseGuards(AuthGuard())
export class PostController {
    constructor(private postService: PostService) { }

    @Get('/markers/my')
    getAllMarkers(@GetUser() user: User) {
        return this.postService.getAllMarkers(user);
    }
    
    @Get('/posts/my')
    getPosts(@Query('page') page: number, @GetUser() user: User) {
        return this.postService.getPosts(page, user);
    }

    @Get('/posts/:id')
    getPostById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
        return this.postService.getPostById(id, user);
    }

    @Post('/posts')
    @UsePipes(ValidationPipe)
    createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
        return this.postService.createPost(createPostDto, user);
    }

    @Delete('/posts/:id')
    deletePost(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
        return this.postService.deletePost(id, user);
    }

    @Patch('/posts/:id')
    @UsePipes(ValidationPipe)
    updatePost(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude' | 'address'>,
        @GetUser() user: User
    ) {
        return this.postService.updatePost(id, updatePostDto, user);
    }
}
