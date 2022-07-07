import { Controller, Put, Body, Param } from '@nestjs/common';
import { AvatarService } from '../service/avatar.service';
import { AddAvatarDto } from '../dto/addAvatar.dto';

@Controller('avatar')
export class AvatarController {
    constructor(private avatarService: AvatarService) { }
    @Put(':walletId')
    updateAvatar(@Param('walletId') walletId: string, @Body() data: Partial<AddAvatarDto>) {
        return this.avatarService.updateAvatar(walletId, data);
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
