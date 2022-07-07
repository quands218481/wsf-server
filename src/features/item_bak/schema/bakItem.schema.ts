import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { createSchemaForClassWithMethods } from '../../../shared/mongoose/create-schema';

@Schema()
export class BakItem extends Document {
  @Prop({
    // required: true,
  })
  kind: string;

  @Prop({
  })
  rarity: string;

  @Prop({
  })
  walletId: string;

  @Prop({
  })
  imgUri: string;

  @Prop({
  })
  tokenId: number;

}

export const BakItemSchema = createSchemaForClassWithMethods(BakItem);
