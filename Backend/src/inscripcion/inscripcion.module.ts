import { Module } from '@nestjs/common';
import { InscripcionService } from './inscripcion.service';
import { InscripcionController } from './inscripcion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { LugarModule } from '../lugar/lugar.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CloudinaryService } from '../common/cloudinary.service';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forFeature([Inscripcion]),
    LugarModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '7d' },
    }),
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [InscripcionController],
  providers: [InscripcionService, CloudinaryService, ConfigService],
  exports: [InscripcionService],
})
export class InscripcionModule { }
