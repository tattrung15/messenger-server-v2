import {
  ValidationOptions,
  buildMessage,
  ValidateBy,
  IsDefined as _IsDefined,
  IsNotEmpty as _IsNotEmpty,
  IsBoolean as _IsBoolean,
  IsDate as _IsDate,
  IsString as _IsString,
  IsNumber as _IsNumber,
  IsNumberOptions,
  IsInt as _IsInt,
  IsArray as _IsArray,
  IsEnum as _IsEnum,
  IsIn as _IsIn,
  Matches as _Matches,
  IsUUID as _IsUUID,
  IsUrl as _IsUrl,
  IsHash as _IsHash,
  IsPhoneNumber as _IsPhoneNumber,
  IsLatLong as _IsLatLong,
  IsJSON as _IsJSON,
  IsPostalCode as _IsPostalCode,
  IsEmail as _IsEmail,
  IsBase64 as _IsBase64,
  ArrayMaxSize as _ArrayMaxSize,
  Length as _Length,
  Max as _Max,
  Min as _Min,
  IS_INT,
  IsObject as _IsObject,
} from "class-validator";
import { CountryCode } from "libphonenumber-js";
import ValidatorJS from "validator";

//https://github.com/typestack/class-validator/tree/dependabot/npm_and_yarn/jest-27.4.7

/****************************************************************************************************
 Reason Code: presence
****************************************************************************************************/
const ReasoncodePresence = "presence";
const ErrorMessagePresence = "$property cannot be empty.";
export const IsDefined = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsDefined({
    ...validationOptions,
    message: ErrorMessagePresence,
    context: { reasonCode: ReasoncodePresence },
  });
export const IsNotEmpty = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsNotEmpty({
    ...validationOptions,
    message: ErrorMessagePresence,
    context: { reasonCode: ReasoncodePresence },
  });

/****************************************************************************************************
 Reason Code: type
****************************************************************************************************/
const ReasoncodeType = "type";
const ErrorMessageType = "$property is the wrong data type.";
export const IsBoolean = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsBoolean({
    ...validationOptions,
    message: ErrorMessageType,
    context: { reasonCode: ReasoncodeType },
  });
export const IsDate = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsDate({
    ...validationOptions,
    message: ErrorMessageType,
    context: { reasonCode: ReasoncodeType },
  });
export const IsString = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsString({
    ...validationOptions,
    message: ErrorMessageType,
    context: { reasonCode: ReasoncodeType },
  });
export const IsNumber = (
  options: IsNumberOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsNumber(options, {
    ...validationOptions,
    message: ErrorMessageType,
    context: { reasonCode: ReasoncodeType },
  });
export const IsInt = (
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  validationOptions = {
    ...validationOptions,
    message: ErrorMessageType,
    context: { reasonCode: ReasoncodeType },
  };
  return ValidateBy(
    {
      name: IS_INT,
      validator: {
        validate: (value): boolean =>
          typeof value === "number" && Number.isSafeInteger(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be an integer number",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
};
_IsInt();
export const IsArray = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsArray({
    ...validationOptions,
    message: ErrorMessageType,
    context: { reasonCode: ReasoncodeType },
  });
export const IsEnum = (
  entity: object,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsEnum(entity, {
    ...validationOptions,
    message: ErrorMessageType,
    context: { reasonCode: ReasoncodeType },
  });
export const IsObject = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsObject({
    ...validationOptions,
    message: ErrorMessageType,
    context: { reasonCode: ReasoncodeType },
  });

/****************************************************************************************************
 Reason Code: format
*****************************************************************************************************/
const ReasoncodeFormat = "format";
const ErrorMessageFormat = "$property is the wrong input format.";
export const Matches = (
  pattern: RegExp,
  modifiers?: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _Matches(pattern, {
    ...validationOptions,
    message: ErrorMessageFormat,
    context: { reasonCode: ReasoncodeFormat },
  });
export const IsUUID = (
  version?: "3" | "4" | "5" | "all",
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsUUID(version, {
    ...validationOptions,
    message: ErrorMessageFormat,
    context: { reasonCode: ReasoncodeFormat },
  });
export const IsHash = (
  algorithm: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsHash(algorithm, {
    ...validationOptions,
    message: ErrorMessageFormat,
    context: { reasonCode: ReasoncodeFormat },
  });
export const IsUrl = (
  options?: ValidatorJS.IsURLOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsUrl(options, {
    ...validationOptions,
    message: ErrorMessageFormat,
    context: { reasonCode: ReasoncodeFormat },
  });
export const IsPhoneNumber = (
  region: CountryCode,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsPhoneNumber(region, {
    ...validationOptions,
    message: ErrorMessageFormat,
    context: { reasonCode: ReasoncodeFormat },
  });
export const IsLatLong = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsLatLong({
    ...validationOptions,
    message: ErrorMessageFormat,
    context: { reasonCode: ReasoncodeFormat },
  });
export const IsJSON = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsJSON({
    ...validationOptions,
    message: ErrorMessageFormat,
    context: { reasonCode: ReasoncodeFormat },
  });
export const IsPostalCode = (
  locale?: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsPostalCode(locale, {
    ...validationOptions,
    message: ErrorMessageFormat,
    context: { reasonCode: ReasoncodeFormat },
  });
export const IsEmail = (
  options?: ValidatorJS.IsEmailOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsEmail(options, {
    ...validationOptions,
    message: ErrorMessageFormat,
    context: { reasonCode: ReasoncodeFormat },
  });
export const IsBase64 = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsBase64({
    ...validationOptions,
    message: ErrorMessageFormat,
    context: { reasonCode: ReasoncodeFormat },
  });

/****************************************************************************************************
 Reason Code: limit
*****************************************************************************************************/
// const ReasoncodeLimit = 'limit';
// const ErrorMessageLimit = '$property  exceeds the limit of array size.';
export const ArrayMaxSize = (
  max: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _ArrayMaxSize(max, {
    ...validationOptions,
    message: ErrorMessageFormat,
    context: { reasonCode: ReasoncodeFormat },
  });

/****************************************************************************************************
 Reason Code: unusable
****************************************************************************************************/
const ReasoncodeUnusable = "unusable";
const ErrorMessageUnusable = "$property contains an unusable value.";
export const IsIn = (
  values: any[],
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsIn(values, {
    ...validationOptions,
    message: ErrorMessageUnusable,
    context: { reasonCode: ReasoncodeUnusable },
  });

/****************************************************************************************************
 Reason Code: range (Min and Max cannot be used because the same error will occur when the types are different.)
*****************************************************************************************************/
export const RANGE = "range";

export function range(num: unknown, min?: number, max?: number): boolean {
  if (
    typeof num === "number" &&
    typeof min === "number" &&
    typeof max === "number"
  ) {
    return num >= min && num <= max;
  } else if (typeof num === "number" && typeof min === "number") {
    return num >= min;
  } else if (typeof num === "number" && typeof max === "number") {
    return num <= max;
  } else {
    return true;
  }
}

export function Range(
  minValue?: number,
  maxValue?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: RANGE,
      constraints: [minValue, maxValue],
      validator: {
        validate: (value, args): boolean =>
          range(value, args.constraints[0], args.constraints[1]),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            "$property is exceeded either the upper limit or the lower limit.",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

export const Max = (
  maxValue?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _Max(maxValue, {
    ...validationOptions,
    message: buildMessage(
      (eachPrefix) =>
        eachPrefix +
        "$property is exceeded either the upper limit or the lower limit.",
      validationOptions,
    ),
    context: { reasonCode: RANGE },
  });

export const Min = (
  minValue?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _Min(minValue, {
    ...validationOptions,
    message: buildMessage(
      (eachPrefix) =>
        eachPrefix +
        "$property is exceeded either the upper limit or the lower limit.",
      validationOptions,
    ),
    context: { reasonCode: RANGE },
  });

/****************************************************************************************************
 Reason Code: length　(MinLength and MaxLength cannot be used because the same error will occur when the types are different.)
*****************************************************************************************************/
const ReasoncodeLength = "length";
const ErrorMessageLength =
  "$property is greater than the max length or less than the min length.";
export const Length = (
  min: number,
  max?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _Length(min, max, {
    ...validationOptions,
    message: ErrorMessageLength,
    context: { reasonCode: ReasoncodeLength },
  });
