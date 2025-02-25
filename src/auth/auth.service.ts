
import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Auth } from './schemas/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    ) {}

    async login(user: Promise<Auth>) {
      const userFind: any = await this.userService.findOneByEmail((await user).email);
      if (!userFind) {
        throw new UnauthorizedException('El email o contraseña son incorrectos');
      }
  
      const isPasswordValid = await bcrypt.compare((await user).password, userFind.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('El email o contraseña son incorrectos');
      }
  
      const payload = { sub: userFind?._id, email: userFind.email };
      return {
        success: true,
        id: userFind._id,
        message: 'Inicio de sesión exitoso',
        email: userFind.email,
        name: userFind.name,
        access_token: this.jwtService.sign(payload),
      };
    }

    async register(userPromise: any) {
      const user = await userPromise;
    
      const existingUser = await this.userService.findOneByEmail(user.email);
    
      if (existingUser) {
        return {
          success: false,
          message: 'El correo ya está registrado',
        };
      }
      const newUser = await this.userService.create(user);
    
      return {
        success: true,
        message: 'Usuario registrado correctamente',
        name: newUser.name,
        email: newUser.email
      };
    }
    

 
    
}
