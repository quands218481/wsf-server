import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BakItem } from '../schema/bakItem.schema';

@Injectable()
export class BakItemService {
    constructor(
        @InjectModel(BakItem.name) private bakItemModel: Model<BakItem>,
    ) { }

    async getList() {
        const items = await this.bakItemModel.find({ tokenId: { $exists: true } }).sort({ tokenId: 1 }).lean();
        return items;
    }
}


