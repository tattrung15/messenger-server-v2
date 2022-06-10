import { Expose } from "class-transformer";

export class ErrorResponse {
  @Expose()
  statusCode: number;

  @Expose()
  message: string;
}
