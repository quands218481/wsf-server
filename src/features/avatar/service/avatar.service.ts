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
    ) {}
    async updateAvatar(walletId: string, data: any) {
        const { imgUri, secretId } = data;
        const tokenId = this.encryptString(secretId);
        if (!tokenId) return { message: 'The secretId is invalid!!' };
        const [item, avatar] = await Promise.all([
            this.itemModel.findOne({walletId: { $regex: `^${walletId}$`, $options: 'i' }, imgUri, tokenId}),
            this.avatarModel.findOne({walletId: { $regex: `^${walletId}$`, $options: 'i' }})
        ]);
        if (item && avatar) {
            avatar.imgUri = imgUri;
            await avatar.save();
            return { message: 'The avatar has been updated!!' };
        } else {
            return { message: 'Update failed!!' };
        }
        
    }
    encryptString(secretId: string): number {
        const dataString = secretId.toString().replaceAll('xMl3Jk', '+').replaceAll('Por21Ld', '/').replaceAll('Ml32', '=');
        const bytes = AES.decrypt(dataString, environments.encrypt_password);
        return Number(JSON.parse(bytes.toString(enc.Utf8)));
    }
    encryptObject(secretId: string): Array<number> {
        const dataString = secretId.toString().replaceAll('xMl3Jk', '+').replaceAll('Por21Ld', '/').replaceAll('Ml32', '=');
        const bytes = AES.decrypt(dataString, environments.encrypt_password);
        return JSON.parse(bytes.toString(enc.Utf8));
    }
}
