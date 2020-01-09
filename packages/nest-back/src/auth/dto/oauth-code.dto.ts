import { IsString } from "class-validator";

export class OAuthCodeDto {
  @IsString()
  readonly provider: string;

  @IsString()
  readonly code: string;
}