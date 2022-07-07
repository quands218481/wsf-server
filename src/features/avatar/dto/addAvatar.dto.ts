import { IsNotEmpty, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
// import { KindEntity } from '../entity/kind.entity';
// import { RarityEntity } from '../entity/rarity.entity';
export class AddAvatarDto {
  @IsNotEmpty()
  @IsString()
  

  @IsNotEmpty()
  @IsString()
  secretId: string;

  @IsNotEmpty()
  @IsString()
  imgUri: string;

}
