import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [ PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: 'top-secret',
        signOptions: {
          expiresIn: 3600,
        },
      }), TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy ],
    exports: [JwtStrategy, PassportModule ],
})
export class AuthModule {}
