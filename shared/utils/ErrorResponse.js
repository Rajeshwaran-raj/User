const constants = require('../constants/ResponseConstants');

class ErrorResponse {
  constructor(
    message,
    errorCode = constants.HTTP_STATUS.INTERNAL_SERVER_ERROR,
  ) {
    this.status = constants.STATUS.ERROR;
    this.message = constants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
    this.error = {
      code: errorCode,
      details: message,
    };
  }

  static notFoundResponse(message, errorCode) {
    return {
      status: constants.STATUS.ERROR,
      message: constants.ERROR_MESSAGES.NOT_FOUND_ERROR,
      error: {
        code: errorCode,
        details: message,
      },
    };
  }

  static create(message, errorCode) {
    return new ErrorResponse(message, errorCode);
  }
}

module.exports = ErrorResponse;
