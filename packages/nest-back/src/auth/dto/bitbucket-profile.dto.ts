import { IsString } from "class-validator";

export class BitBucketProfileDto {
  @IsString()
  readonly uuid: string;

  @IsString()
  readonly accountId: string;

  @IsString()
  readonly displayName: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly avatarUrl: string;
}