import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { ItemService } from '../service/item.service';
// import { AddItemDto } from '../dto/addItem.dto';
// import { FetchItemsDto } from '../dto/fetchItem.dto';

@Controller('items')
export class ItemController {
    constructor(private itemService: ItemService) { }
    @Get('allocated')
    getListItems() {
        return this.itemService.getListItems();
    }
    @Put('whiteList/:walletId')
    updateWhiteList(@Param('walletId') walletId: string) {
        return this.itemService.updateWhiteList(walletId);
    }
    @Put(':walletId')
    updateTokenId(@Param('walletId') walletId: string, @Body('tokenId') tokenId: number) {
        return this.itemService.updateTokenId(walletId, tokenId);
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
