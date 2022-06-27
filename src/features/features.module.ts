import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationModule } from './notification/notification.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';
// import { RewardModule } from './reward/reward.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoomModule,
    MessagesModule,
    NotificationModule,
    ItemModule,
    // RewardModule,
  ],
  controllers: [],
  exports: [
    AuthModule,
    UserModule,
    RoomModule,
    MessagesModule,
    NotificationModule,
    ItemModule,
    // RewardModule,
  ],
})
export class FeaturesModule {}
