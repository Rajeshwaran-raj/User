const constants = require('../constants/ResponseConstants');

class JoiErrorResponse {
  constructor(error) {
    this.error = error;
    this.errorDetails = this.formatErrorDetails();
  }

  formatErrorDetails() {
    return this.error.details && Array.isArray(this.error.details)
      ? this.error.details.map((detail) => ({
        message: detail.message,
        path: detail.path.join('.'),
      }))
      : [];
  }

  getResponse() {
    return {
      status: constants.STATUS.ERROR,
      message: constants.ERROR_MESSAGES.VALIDATION_ERROR,
      error: {
        code: constants.ERROR_CODES.VALIDATION_ERROR,
        details: this.errorDetails,
      },
    };
  }

  static format(error) {
    const response = new JoiErrorResponse(error);
    return response.getResponse();
  }
}

module.exports = JoiErrorResponse;