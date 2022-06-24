import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { createSchemaForClassWithMethods } from '../../../shared/mongoose/create-schema';
// import { ObjectId } from '../../../shared/mongoose/object-id';

@Schema()
export class Item extends Document {
  @Prop({
    // required: true,
  })
  kind: string;

  @Prop({
  })
  rarity: string;

  // @Prop({
  // })
  // level: number;

  @Prop({
  })
  owner: string;

  @Prop({
  })
  imgUri: string;

  @Prop({
  })
  tokenId: number;

}

export const ItemSchema = createSchemaForClassWithMethods(Item);
