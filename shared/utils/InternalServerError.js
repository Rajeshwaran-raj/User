const HttpError = require('./HttpError');

class InternalServerError extends HttpError {
  constructor(message, errorcode) {
    super(500, message || 'Internal server error', errorcode);
  }
}

module.exports = InternalServerError;
