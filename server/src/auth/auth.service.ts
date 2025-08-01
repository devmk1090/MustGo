import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EditProfileDto } from './dto/edit-profile.dto';
import { MarkerColor } from 'src/post/marker-color.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async signup(authDto: AuthDto) {
        const { email, password } = authDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            loginType: 'email',
        });
        try {
            await this.userRepository.save(user);
        } catch (error) {
            console.log(error);
            if (error.code === '23505') {
                throw new ConflictException('User already exists');
            }

            throw new InternalServerErrorException('회원가입 도중 에러가 발생했습니다.');
        }
    }

    private async getTokens(payload: { email: string }) {
        // 순차적으로 만들 필요없기 때문에 Promise.all 사용
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION')
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
            })
        ])

        return { accessToken, refreshToken };
    }


    async signin(authDto: AuthDto) {
        const { email, password } = authDto;
        const user = await this.userRepository.findOneBy({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
        }

        const { accessToken, refreshToken } = await this.getTokens({ email });
        await this.updateHashedRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken };
    }

    private async updateHashedRefreshToken(id: number, refreshToken: string) {
        const salt = await bcrypt.genSalt();
        const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

        try {
            await this.userRepository.update(id, { hashedRefreshToken });
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async refreshToken(user: User) {
        console.log(user);
        const { email } = user;
        const { accessToken, refreshToken } = await this.getTokens({ email });

        if (!user.hashedRefreshToken) {
            throw new ForbiddenException();
        }

        await this.updateHashedRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken };
    }

    getProfile(user: User) {
        const { password, hashedRefreshToken, ...rest } = user;

        return { ...rest }
    }

    async editProfile(editProfileDto: EditProfileDto, user: User) {
        const profile = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :userId', { userId: user.id })
            .getOne();

        if (!profile) {
            throw new NotFoundException('존재하지 않는 사용자입니다.');
        }

        const { nickname, imageUri } = editProfileDto;
        profile.nickname = nickname;
        profile.imageUri = imageUri;

        try {
            await this.userRepository.save(profile);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('프로필 수정 도중 에러가 발생했습니다.');
        }
    }

    async deleteRefreshToken(user: User) {
        try {
            await this.userRepository.update(user.id, { hashedRefreshToken: undefined });
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async deleteAccount(user: User) {
        try {
            await this.userRepository.createQueryBuilder('user')
                .delete()
                .from(User)
                .where('id = :id', { id: user.id })
                .execute();
        } catch (error) {
            console.log(error);
            throw new BadRequestException('탈퇴할 수 없습니다. 남은 데이터가 존재하는지 확인해주세요.');
        }
    }

    async updateCategory(
        categories: Record<keyof MarkerColor, string>,
        user: User
    ) {
        const { RED, YELLOW, BLUE, GREEN, PURPLE } = MarkerColor

        if (Object.keys(categories).every((color: MarkerColor) => [RED, YELLOW, BLUE, GREEN, PURPLE].includes(color))) {
            throw new BadRequestException('유효하지 않은 카테고리입니다.');
        }

        user[RED] = categories[RED];
        user[YELLOW] = categories[YELLOW];
        user[BLUE] = categories[BLUE];
        user[GREEN] = categories[GREEN];
        user[PURPLE] = categories[PURPLE];

        try {
            await this.userRepository.save(user);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('카테고리 수정 도중 에러가 발생했습니다.');
        }

        const { password, hashedRefreshToken, ...rest } = user;

        return { ...rest } 
    }
}
