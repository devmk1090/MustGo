import { Injectable } from '@nestjs/common';

//각 컨트롤러의 메서드에 해당하는 db작업 로직이 들어감

@Injectable()
export class PostService {
    getPosts() {
        return ['a게시글', 'b게시글',];
    }
}
