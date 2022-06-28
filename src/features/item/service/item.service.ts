import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { AES, enc } from 'crypto-js';
import { set_whitelist } from './Whitelist';
import { Item } from '../schema/item.schema';


@Injectable()
export class ItemService {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<Item>,
    ) {}
        //lấy ra danh sách items đã đc cập nhật tokenId
    async getListItems() {
        const items = await this.itemModel.find({ tokenId: { $exists: true} }).sort({ tokenId: 1 }).lean();
        return items;
    }
    async updateTokenId(walletId: string, tokenId: number) {
        const res = await this.itemModel.updateOne({walletId}, {tokenId});
        if (!res.nModified)  return { message: 'Update failed!! The wallet does not exist '};
        return { message: 'Update succesful!!'};
    }
    async checkWalletId(walletId: string) {
        const item = await this.itemModel.findOne({walletId}).lean();
        if (!item) return { isExist: false };
        return { isExist: true };
    }
    async updateWhiteList(walletId: string) {
        const item = await this.itemModel.findOne({walletId});
        if (!item) {
            return { message: 'The wallet does not exist' };
    } else {
            const res = await set_whitelist(walletId);
            const data = res.data || res;
            return { message: 'Update successful!!', data};
        };
    }
    // async getItem(secretId: string) {
    //     const tokenId = this.encryptString(secretId);
    //     const item = await this.itemModel.findOne({ tokenId });
    //     return item;
    // }
    // async updateItem(secretId: string, data: object) {
    //     const tokenId = this.encryptString(secretId);
    //     const item = await this.itemModel.findOne({ tokenId });
    //     const keys = Object.keys(data);
    //     keys.forEach(key => {
    //         if (data[key]) {
    //             item[key] = data[key];
    //         };
    //     });
    //     await item.save();
    //     return item;
    // }
    // encryptString(secretId: string): number {
    //     const dataString = secretId.toString().replaceAll('xMl3Jk', '+').replaceAll('Por21Ld', '/').replaceAll('Ml32', '=');
    //     const bytes = AES.decrypt(dataString, 'thehuman');
    //     return Number(JSON.parse(bytes.toString(enc.Utf8)));
    // }
    // encryptObject(secretId: string): Array<number> {
    //     const dataString = secretId.toString().replaceAll('xMl3Jk', '+').replaceAll('Por21Ld', '/').replaceAll('Ml32', '=');
    //     const bytes = AES.decrypt(dataString, 'thehuman');
    //     return JSON.parse(bytes.toString(enc.Utf8));
    // }
}
