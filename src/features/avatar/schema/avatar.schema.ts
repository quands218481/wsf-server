import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { createSchemaForClassWithMethods } from '../../../shared/mongoose/create-schema';
// import { ObjectId } from '../../../shared/mongoose/object-id';

@Schema()
export class Avatar extends Document {

  @Prop({
  })
  walletId: string;

  @Prop({
  })
  imgUri: string;

}

export const AvatarSchema = createSchemaForClassWithMethods(Avatar);
