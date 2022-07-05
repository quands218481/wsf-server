import { Module } from '@nestjs/common';
import { AvatarService } from './service/avatar.service';
import { AvatarController } from './controller/avatar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Avatar, AvatarSchema } from './schema/avatar.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Avatar.name,
        schema: AvatarSchema,
      }
    ])
  ],
  controllers: [AvatarController],
  providers: [AvatarService],
  exports: [AvatarService],
})
export class AvatarModule {}
