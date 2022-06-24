import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { createSchemaForClassWithMethods } from '../../shared/mongoose/create-schema';

@Schema()
export class Reward extends Document {
    @Prop({
    })
    hour: number;

    @Prop({
    })
    paid: number;

    @Prop({
    })
    totalPaid: number;

}

export const RewardSchema = createSchemaForClassWithMethods(Reward);
