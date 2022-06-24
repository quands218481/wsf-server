import { Controller, Get, Put, Body, Query, Param } from '@nestjs/common';
import { ItemService } from '../service/item.service';
import { AddItemDto } from '../dto/addItem.dto';
import { FetchItemsDto } from '../dto/fetchItem.dto';

@Controller('items')
export class ItemController {
    constructor(private itemService: ItemService) { }
    @Get()
    getListItem(@Query() query: FetchItemsDto) {
        const secretId = String(query.secretId);
        return this.itemService.getListItems(secretId);
    }
    @Get(':secretId')
    getItem(@Param('secretId') secretId: string) {
        return this.itemService.getItem(secretId);
    }
    @Put(':secretId')
    updateItem(@Param('secretId') secretId: string, @Body() data: Partial<AddItemDto> ) {
        return this.itemService.updateItem(secretId, data)
    }
}
