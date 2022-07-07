import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BakItemController } from './controller/bakItem.controller';
import { BakItemService } from './service/bakItem.service';
import { BakItem, BakItemSchema } from './schema/bakItem.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BakItem.name,
        schema: BakItemSchema,
      }
    ])
  ],
  controllers: [BakItemController],
  providers: [BakItemService],
  exports: [BakItemService],
})
export class BakItemModule {}