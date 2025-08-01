import { Body, Controller, Get, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { EditProfileDto } from './dto/edit-profile.dto';
import { MarkerColor } from 'src/post/marker-color.enum';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signup(@Body(ValidationPipe) authDto: AuthDto) {
        return this.authService.signup(authDto);
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) authDto: AuthDto) {
        return this.authService.signin(authDto);
    }

    @Get('/refresh')
    @UseGuards(AuthGuard())
    refresh(@GetUser() user: User) {
        return this.authService.refreshToken(user);
    }

    @Get('/me')
    @UseGuards(AuthGuard())
    getProfile(@GetUser() user: User) {
        return this.authService.getProfile(user);
    }

    @Patch('/me')
    @UseGuards(AuthGuard())
    editProfile(@Body() editProfileDto: EditProfileDto, @GetUser() user: User) {
        return this.authService.editProfile(editProfileDto, user);
    }

    @Post('/logout')
    @UseGuards(AuthGuard())
    logout(@GetUser() user: User) {
        return this.authService.deleteRefreshToken(user);
    }

    @Post('/me')
    @UseGuards(AuthGuard())
    deleteAccount(@GetUser() user: User) {
        return this.authService.deleteAccount(user);
    }

    @Patch('/category')
    @UseGuards(AuthGuard())
    updateCategory(
        @Body() categories: Record<keyof MarkerColor, string>,
        @GetUser() user: User) {
        return this.authService.updateCategory(categories, user);
    }
}
