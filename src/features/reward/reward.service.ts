import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward } from './reward.schema';
import * as ethers from 'ethers';
let provider = new ethers.providers.StaticJsonRpcProvider(
  'https://bsc-dataseed.binance.org/',
);
import * as DnsABI from './DNS.json';
const abi = DnsABI.abi;
const dns_contract = '0x680891034831e06ba48bC5283412D41A5F675404';
@Injectable()
export class RewardService {
  contract: any;
  constructor(@InjectModel(Reward.name) private rewardModel: Model<Reward>) {
    this.contract = new ethers.Contract(dns_contract, abi, provider);
  }

  async calculatePaidPerHour(hour: number) {
    const res = await this.contract.biggestBuyerPaid(hour - 1);
    const paid = parseFloat(ethers.utils.formatUnits(res, 18));
    if (paid) {
        await this.rewardModel.create({ hour: hour - 1, paid });
    }
  }

  async getTotalPaid() {
    let h = await this.contract.getHour();
    let hour = h.toNumber();
    const reward = await this.rewardModel.findOne({ hour: hour - 1 });
    // nếu chưa có bản ghi cho giờ gần nhất thì thêm những bản ghi còn thiếu ở bảng reward
    if (!reward) {
      const latestReward = (await this.rewardModel
        .find()
        .sort({ hour: -1 })
        .limit(1))[0];
      let latestHour = 0;
      let latestTotal = 0;
      if (latestReward) {
        latestHour = latestReward.hour;
        latestTotal = latestReward.totalPaid;
      }
      const promises = [];
      for (let i = latestHour + 2; i < hour + 1; i++) {
        promises.push(this.calculatePaidPerHour(i));
      }
      // thêm bản ghi cho từng giờ, xử lý ngoại lệ khi mảng quá dài
      await this.execPromises(promises);
      // tính tổng và lưu totalPaid vào bản ghi mới nhất
      const agg = await this.calculateTotalPaid(latestHour, latestTotal);
      if (!agg) {
        return { hour, totalPaid: latestReward.totalPaid };
      }
      return agg;
    }
    return reward;
  }

  async calculateTotalPaid(latestHour: number, latestTotal: number) {
      const agg = (await this.rewardModel.aggregate([
        {
            $match: {
                hour: { $gt: latestHour }
            }
        },
        {
          $group: {
            _id: null,
            hour: { $max: '$hour' },
            totalPaid: { $sum: '$paid' },
          },
        },
      ]))[0];
      if(!agg) {
        return false;
      }
      agg.totalPaid = agg.totalPaid + latestTotal;
      //lưu totalPaid vào bản ghi mới nhất
      const latestReward = (await this.rewardModel
        .find()
        .sort({ hour: -1 })
        .limit(1))[0];
      latestReward.totalPaid = agg.totalPaid;
      await latestReward.save();
      //
      return agg;
  }

  async execPromises(promises: any) {
    if (promises.length > 5) {
      for (let i = 0; i < promises.length; i = i + 5) {
        const newPromises = promises.slice(i, i + 5);
        await Promise.all(newPromises);
      }
    } else {
      await Promise.all(promises);
    }
  }
}
