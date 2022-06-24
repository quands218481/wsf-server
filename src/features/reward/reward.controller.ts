import { Controller, Get, Put, Body, Query, Param } from '@nestjs/common';
import { RewardService } from './reward.service';

@Controller('reward')
export class RewardController {
    constructor(private rewardService: RewardService) { }
    @Get('total')
    getTotalPaid() {
        return this.rewardService.getTotalPaid();
    }
}
