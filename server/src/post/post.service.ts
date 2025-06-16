import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

//각 컨트롤러의 메서드에 해당하는 db작업 로직이 들어감

@Injectable()
export class PostService {
    async getPosts() {
        return ['a게시글', 'b게시글',];
    }

    async createPost(createPostDto: CreatePostDto) {
        const {
            latitude,
            longitude,
            color,
            address,
            title,
            description,
            date,
            score,
            imageUris,
        } = createPostDto;

    }

}
