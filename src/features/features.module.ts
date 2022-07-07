import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationModule } from './notification/notification.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';
import { AvatarModule } from './avatar/avatar.module';
import { BakItemModule } from './item_bak/bakItem.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    RoomModule,
    MessagesModule,
    NotificationModule,
    ItemModule,
    AvatarModule,
    BakItemModule,
  ],
  controllers: [],
  exports: [
    AuthModule,
    UserModule,
    RoomModule,
    MessagesModule,
    NotificationModule,
    ItemModule,
    AvatarModule,
    BakItemModule,
  ],
})
export class FeaturesModule {}
