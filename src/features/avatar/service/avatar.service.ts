import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AES, enc } from 'crypto-js';
import { Avatar } from '../schema/avatar.schema';
import { Item } from '../../item/schema/item.schema';
import { environments } from 'src/environments/environments';

@Injectable()
export class AvatarService {

    constructor(
        @InjectModel(Item.name) private itemModel: Model<Item>,
        @InjectModel(Avatar.name) private avatarModel: Model<Avatar>
    ) { }

    async getAvatar(secretId: string) {
        try {
            const walletId = this.encryptWallet(secretId);
            const avatar = await this.avatarModel.findOne({ walletId: { $regex: `^${walletId}$`, $options: 'i' } });
            if (!avatar) return { message: 'This wallet does not exist!!' };
            return avatar;
        } catch (error) {
            return error
        }
    }
    async updateAvatar(secretId: string, data: any) {
        const { imgUri } = data;
        const tokenId = this.encryptString(secretId);
        if (!tokenId) return { message: 'The secretId is invalid!!' };
        const item = await this.itemModel.findOne({ imgUri, tokenId });
        if (!item) return { message: 'The tokenId is invalid!!' };
        const avatar = await this.avatarModel.findOne({ walletId: { $regex: `^${item.walletId}$`, $options: 'i' } });
        if (avatar) {
            avatar.imgUri = imgUri;
            await avatar.save();
            return { message: 'The avatar has been updated!!' };
        } else {
            return { message: 'Update failed!!' };
        }
    }
    encryptWallet(secretId: string): string {
        const dataString = secretId.toString().replaceAll('xMl3Jk', '+').replaceAll('Por21Ld', '/').replaceAll('Ml32', '=');
        const bytes = AES.decrypt(dataString, environments.encrypt_password);
        const walletId = bytes.toString(enc.Utf8);
        return walletId;
    }
    encryptString(secretId: string) {
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
