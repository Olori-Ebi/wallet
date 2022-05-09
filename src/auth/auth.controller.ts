import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('/signup')
    async signup(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.authService.createUser(authCredentialsDto)
    }

    @Post('/signin')
    async login(
      @Body()
      authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
      return this.authService.signin(authCredentialsDto);
    }
}
