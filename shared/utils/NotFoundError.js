const HttpError = require('./HttpError');

class NotFoundError extends HttpError {
  constructor(message, errorcode) {
    super(404, message || 'Resource not found', errorcode);
  }
}

module.exports = NotFoundError;
