class HttpError extends Error {
  constructor(statusCode, message, errorcode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errorcode = errorcode;
  }
}

module.exports = HttpError;
