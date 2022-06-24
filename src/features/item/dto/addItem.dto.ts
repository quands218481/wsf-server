import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
// import { KindEntity } from '../entity/kind.entity';
// import { RarityEntity } from '../entity/rarity.entity';
export class AddItemDto {
  @IsNotEmpty()
  @IsString()
  // @ApiProperty({
  //   description: 'description of the severity property',
  //   enum: KindEntity
  // })
  // kindEntity: KindEntity;
  // kind: string;

  // @IsNotEmpty()
  // @IsNumber()
  // level: number;

  @IsNotEmpty()
  @IsString()
  // @IsEnum(RarityEntity)
  rarity: string;

  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  imgUri: string;

  @IsNotEmpty()
  @IsNumber()
  tokenId: number;
}
