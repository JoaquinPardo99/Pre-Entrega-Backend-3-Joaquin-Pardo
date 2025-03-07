export const ERROR_CODES = {
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  INCOMPLETE_VALUES: "INCOMPLETE_VALUES",
  PET_NOT_FOUND: "PET_NOT_FOUND",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_PASSWORD: "INVALID_PASSWORD",
};

export class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
