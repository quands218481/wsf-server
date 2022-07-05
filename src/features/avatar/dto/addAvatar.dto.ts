import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
// import { KindEntity } from '../entity/kind.entity';
// import { RarityEntity } from '../entity/rarity.entity';
export class AddItemDto {

  @IsNotEmpty()
  @IsString()
  imgUri: string;

  @IsNotEmpty()
  @IsString()
  walletId: string;

}
