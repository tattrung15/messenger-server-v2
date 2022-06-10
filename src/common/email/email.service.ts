import { Injectable } from "@nestjs/common";
import { CustomLogger } from "../logger/logger.service";

@Injectable()
export class EmailService {
  constructor(private logger: CustomLogger) {}

  send(email: string) {
    this.logger.log(`Send to ${email}`);
  }
}
