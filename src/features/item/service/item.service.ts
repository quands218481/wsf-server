import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AES, enc } from 'crypto-js';
import { Item } from '../schema/item.schema';

@Injectable()
export class ItemService {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<Item>,
    ) { }
    async getListItems(secretId: string) {
        const tokenIds = this.encryptObject(secretId)
        const items = await this.itemModel.find({ tokenId: { $in: tokenIds } }).sort({ tokenId: 1 });
        return items;
    }
    async getItem(secretId: string) {
        const tokenId = this.encryptString(secretId);
        const item = await this.itemModel.findOne({ tokenId });
        return item;
    }
    async updateItem(secretId: string, data: object) {
        const tokenId = this.encryptString(secretId);
        const item = await this.itemModel.findOne({ tokenId });
        const keys = Object.keys(data);
        keys.forEach(key => {
            if (data[key]) {
                item[key] = data[key];
            };
        });
        await item.save();
        return item;
    }
    encryptString(secretId: string): number {
        const bytes = AES.decrypt(secretId, 'thehuman');
        return Number(bytes.toString(enc.Utf8));
    }
    encryptObject(secretId: string): Array<number> {
        const bytes = AES.decrypt(secretId, 'thehuman');
        return JSON.parse(bytes.toString(enc.Utf8));
    }
}
