
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schemas/user.schema';
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
        access_token: this.jwtService.sign(payload),
      };
    }

    async register(userPromise: any) {
      const user = await userPromise; // Asegurar que user se resuelve correctamente
    
      // Buscar si ya existe el usuario
      const existingUser = await this.userService.findOneByEmail(user.email);
    
      if (existingUser) {
        throw new ConflictException({
          message: 'El correo ya está registrado',
          error: 'Conflict',
          statusCode: 409,
        });
      }
    
      return this.userService.create(user);
    }
    
}
