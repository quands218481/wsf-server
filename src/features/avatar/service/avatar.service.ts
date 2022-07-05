import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AES, enc } from 'crypto-js';
import { Avatar } from '../schema/avatar.schema';


@Injectable()
export class AvatarService {
    constructor(
        @InjectModel(Avatar.name) private avatarModel: Model<Avatar>,
    ) {}
    async updateAvatar(walletId: string, imgUri: string) {
        const item = await this.avatarModel.findOne({walletId: { $regex: `^${walletId}$`, $options: 'i' }});
        if (!item) return { message: 'The walletId is invalid!!' };
        item.imgUri = imgUri;
        await item.save();
        return { message: 'The avatar has been updated!!' };
    }
    encryptString(secretId: string): number {
        const dataString = secretId.toString().replaceAll('xMl3Jk', '+').replaceAll('Por21Ld', '/').replaceAll('Ml32', '=');
        const bytes = AES.decrypt(dataString, 'thehuman');
        return Number(JSON.parse(bytes.toString(enc.Utf8)));
    }
    encryptObject(secretId: string): Array<number> {
        const dataString = secretId.toString().replaceAll('xMl3Jk', '+').replaceAll('Por21Ld', '/').replaceAll('Ml32', '=');
        const bytes = AES.decrypt(dataString, 'thehuman');
        return JSON.parse(bytes.toString(enc.Utf8));
    }
}
