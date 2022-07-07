import { Module } from '@nestjs/common';
import { AvatarService } from './service/avatar.service';
import { AvatarController } from './controller/avatar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Avatar, AvatarSchema } from './schema/avatar.schema';
// import { ItemModule } from '../item/item.module';
import { Item, ItemSchema } from '../item/schema/item.schema';
@Module({
  imports: [ 
    MongooseModule.forFeature([
      {
        name: Item.name,
        schema: ItemSchema,
      }
    ]),
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
