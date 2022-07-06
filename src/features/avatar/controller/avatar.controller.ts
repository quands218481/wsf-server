import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { AvatarService } from '../service/avatar.service';

@Controller('avatar')
export class AvatarController {
    constructor(private avatarService: AvatarService) { }
    @Put(':walletId')
    updateAvatar(@Param('walletId') walletId: string, @Body('imgUri') imgUri: string) {
        return this.avatarService.updateAvatar(walletId, imgUri);
    }
    // @Get(':secretId')
    // getItem(@Param('secretId') secretId: string) {
    //     return this.itemService.getItem(secretId);
    // }
    // @Put(':secretId')
    // updateItem(@Param('secretId') secretId: string, @Body() data: Partial<AddItemDto> ) {
    //     return this.itemService.updateItem(secretId, data)
    // }
}
