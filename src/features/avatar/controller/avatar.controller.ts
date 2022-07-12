import { Controller, Put, Body, Param, Get } from '@nestjs/common';
import { AvatarService } from '../service/avatar.service';
import { AddAvatarDto } from '../dto/addAvatar.dto';

@Controller('avatar')
export class AvatarController {
    constructor(private avatarService: AvatarService) { }
    @Get(':secretId')
    getAvatar(@Param('secretId') secretId: string) {
        return this.avatarService.getAvatar(secretId);
    }
    @Put(':secretId')
    updateAvatar(@Param('secretId') secretId: string, @Body() data: Partial<AddAvatarDto>) {
        return this.avatarService.updateAvatar(secretId, data);
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
