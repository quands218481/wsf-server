import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { ItemService } from '../service/item.service';
// import { AddItemDto } from '../dto/addItem.dto';
// import { FetchItemsDto } from '../dto/fetchItem.dto';

@Controller('items')
export class ItemController {
    constructor(private itemService: ItemService) { }
    @Get('list/:secretId')
    getList(@Param('secretId') secretId: string) {
        return this.itemService.getList(secretId);
    }
    @Get('allocated')
    getListAllocated() {
        return this.itemService.getListAllocated();
    }
    @Put('whiteList/:walletId')
    updateWhiteList(@Param('walletId') walletId: string) {
        return this.itemService.updateWhiteList(walletId);
    }
    @Get(':walletId')
    checkWalletId(@Param('walletId') walletId: string) {
        return this.itemService.checkWalletId(walletId);
    }
    @Put(':walletId')
    updateTokenId(@Param('walletId') walletId: string, @Body('secretId') secretId: string) {
        return this.itemService.updateTokenId(walletId, secretId);
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
