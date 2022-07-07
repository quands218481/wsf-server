import { Controller, Get, Param } from '@nestjs/common';
import { BakItemService } from '../service/bakItem.service';


@Controller('bakItems')
export class BakItemController {
    constructor(private bakItemService: BakItemService) { }
    @Get()
    getList() {
        return this.bakItemService.getList();
    }
}
