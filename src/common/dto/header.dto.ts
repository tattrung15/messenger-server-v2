import { Expose } from "class-transformer";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CommonHeader {
  @IsNotEmpty()
  @Matches(/^Bearer[ ]+([^ ]+)[ ]*$/i)
  @IsString()
  @Expose({ name: "authorization" })
  authorization: string;
}
