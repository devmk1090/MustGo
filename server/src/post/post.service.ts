import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

//각 컨트롤러의 메서드에 해당하는 db작업 로직이 들어감

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) { }

    async getAllMarkers() {
        try {
            const markers = await this.postRepository
                .createQueryBuilder('post')
                .select([
                    'post.id',
                    'post.latitude',
                    'post.longitude',
                    'post.color',
                    'post.score',
                ])
                .getMany()

            return markers
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                '마커를 가져오는 도중 에러가 발생했습니다'
            )
        }
    }

    //페이지네이션 처리
    async getPosts(page: number) {
        const perPage = 10
        const offset = (page - 1) * perPage;

        return this.postRepository
            .createQueryBuilder('post')
            .orderBy('post.date', 'DESC')
            .skip(offset)
            .take(perPage)
            .getMany();
    }

    async getPostById(id: number) {
        try {
            const foundPost = await this.postRepository
                .createQueryBuilder('post')
                .where('post.id = :id', { id })
                .getOne();

            if (!foundPost) {
                throw new NotFoundException('존재하지 않는 피드입니다');
            }

            return foundPost

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                '장소를 가져오는 도중 에러가 발생했습니다'
            )
        }
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

        const post = this.postRepository.create({
            latitude,
            longitude,
            color,
            address,
            title,
            description,
            date,
            score,
        });

        //db에 저장
        try {
            await this.postRepository.save(post);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                '장소를 추가하는 도중 에러가 발생했습니다'
            )
        }

        return post;
    }

    async deletePost(id: number) {
        try {
            const result = await this.postRepository
                .createQueryBuilder('post')
                .delete()
                .from(Post)
                .where('id = :id', { id })
                .execute();

            if (result.affected === 0) {
                throw new NotFoundException('존재하지 않는 피드입니다');
            }

            return id
        } catch (error) {
            throw new InternalServerErrorException(
                '장소를 삭제하는 도중 에러가 발생했습니다.'
            )
        }
    }

    async updatePost(id: number, updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude' | 'address'>) {

        const post = await this.getPostById(id)
        const {
            title,
            description,
            color,
            date,
            score,
            imageUris,
        } = updatePostDto
        post.title = title
        post.description = description
        post.color = color
        post.date = date
        post.score = score

        //  TODO: image module

        try {
            await this.postRepository.save(post)
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                '장소를 수정하는 도중 에러가 발생했습니다.'
            )
        }

        return post
    }
}
