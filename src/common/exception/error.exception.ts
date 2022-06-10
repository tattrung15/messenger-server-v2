import {
  BadRequestException,
  NotFoundException,
  ValidationError,
} from "@nestjs/common";

export class ValidationErrorException extends BadRequestException {
  errors: ValidationError[];
  constructor(errors: ValidationError[]) {
    super(errors);
    this.errors = errors;
  }
}

export class ResourceNotFoundException extends NotFoundException {}
