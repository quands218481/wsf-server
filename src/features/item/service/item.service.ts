import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AES, enc } from 'crypto-js';
// import { set_whitelist } from './Whitelist';
import { Item } from '../schema/item.schema';
import {environments} from '../../../environments/environments';

@Injectable()
export class ItemService {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<Item>,
    ) { }
    async getList(secretId: string) {
        const tokenIds = this.encryptObject(secretId);
        const items = await this.itemModel.find({ tokenId: { $in: tokenIds } }).limit(tokenIds.length).lean();
        return items;
    }
    //lấy ra danh sách items đã đc cập nhật tokenId
    async getListAllocated() {
        const items = await this.itemModel.find({ tokenId: { $exists: true } }).sort({ tokenId: 1 }).lean();
        return items;
    }
    // async updateTokenId(walletId: string, secretId: string) {
    //     const tokenId = this.encryptString(secretId);
    //     if (typeof tokenId == 'number' && (0 < tokenId && tokenId < 3000) && Number.isInteger(tokenId) == true) {
    //         const tokenItem = await this.itemModel.findOne({tokenId});
    //         if (tokenItem) return { message: 'This token was allocated!!' };
    //         const item = await this.itemModel.findOne({ walletId: { $regex: `^${walletId}$`, $options: 'i' }, tokenId: { $exists: false } });
    //         if (!item) return { message: 'The walletId is invalid or this item was allocated!!' };
    //         item.tokenId = tokenId;
    //         await item.save();
    //         return { message: 'Update succesful!!' };
    //     }
    //     return { message: 'The secretId is invalid!!' };
    // }
    async checkWalletId(walletId: string) {
        const numberOfWallet = await this.itemModel.countDocuments({ walletId: { $regex: `^${walletId}$`, $options: 'i' } });
        if (!numberOfWallet) return { isExist: false, numberOfWallet };
        return { isExist: true, numberOfWallet };
    }
    // async updateWhiteList(walletId: string) {
    //     const numberOfWallet = await this.itemModel.countDocuments({ walletId: { $regex: `^${walletId}$`, $options: 'i' } });
    //     if (!numberOfWallet) {
    //         return { message: 'The wallet does not exist!!' };
    //     } else {
    //         const res = await set_whitelist(walletId, numberOfWallet);
    //         const data = res.data || res;
    //         return { message: 'Update successful!!', data };
    //     }
    // }
    encryptString(secretId: string): number {
        const dataString = secretId.toString().replaceAll('xMl3Jk', '+').replaceAll('Por21Ld', '/').replaceAll('Ml32', '=');
        const bytes = AES.decrypt(dataString, environments.encrypt_password);
        return Number(bytes.toString(enc.Utf8));
    }
    encryptObject(secretId: string): Array<number> {
        const dataString = secretId.toString().replaceAll('xMl3Jk', '+').replaceAll('Por21Ld', '/').replaceAll('Ml32', '=');
        const bytes = AES.decrypt(dataString, environments.encrypt_password);
        return JSON.parse(bytes.toString(enc.Utf8));
    }
}


/*
import CCC from 'crypto-js';

var ciphertext = CCC.AES.encrypt('1.5', 'thehuman').toString();
const secretId = ciphertext.toString().replaceAll('+','xMl3Jk').replaceAll('/','Por21Ld').replaceAll('=','Ml32')
console.log(':: ~ secretId', secretId)

// Decrypt
var bytes  = CCC.AES.decrypt(ciphertext, 'thehuman');
var originalText = bytes.toString(CCC.enc.Utf8);

console.log(originalText)
*/