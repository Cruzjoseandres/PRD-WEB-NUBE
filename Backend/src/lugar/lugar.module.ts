import { Module, forwardRef } from '@nestjs/common';
import { LugarService } from './lugar.service';
import { LugarController } from './lugar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lugar } from './entities/lugar.entity';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Request } from 'express';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CloudinaryService } from '../common/cloudinary.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lugar]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    MulterModule.register({
      storage: memoryStorage(),
      fileFilter: (req: Request, file: Express.Multer.File, callback) => {
        // Validación por MIME type
        const allowedMimeTypes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/gif',
          'image/webp',
          'image/bmp',
          'image/svg+xml'
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Solo se permiten archivos de imagen'), false);
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB máximo
      },
    }),
  ],
  controllers: [LugarController],
  providers: [LugarService, CloudinaryService, ConfigService],
  exports: [LugarService],
})
export class LugarModule { }
