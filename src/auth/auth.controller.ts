import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { Auth } from './schemas/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string) {
    const newUser: User = { name, email, password };
    return this.authService.register(newUser);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body('email') email: string, @Body('password') password: string) {
    const user: Auth = { email, password };
    return this.authService.login(Promise.resolve(user));
  }
}
