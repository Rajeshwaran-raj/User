const NotFoundError = require('./NotFoundError');
const InternalServerError = require('./InternalServerError');
const constants = require('../constants/ResponseConstants');
const ErrorResponse = require('./ErrorResponse');

class ErrorHandler {
  static create(message, code) {
    return { status: 'error', message, code };
  }

  static handle(error, res) {
    console.error('Error:', error);

    if (error instanceof NotFoundError) {
      return res
        .status(constants.HTTP_STATUS.NOT_FOUND)
        .json(ErrorResponse.notFoundResponse(error.message, error.errorcode));
    }

    if (error instanceof InternalServerError) {
      return res
        .status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse.create(error.message, error.errorcode));
    }

    return res
      .status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        ErrorResponse.create(
          constants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          constants.ERROR_CODES.INTERNAL_SERVER_ERROR_CODE,
        ),
      );
  }

  static handleNotFound(res, message) {
    console.warn(`Not Found: ${message}`);
    return res
      .status(constants.HTTP_STATUS.NOT_FOUND)
      .json(
        ErrorResponse.create(
          message || constants.ERROR_MESSAGES.NOT_FOUND,
          constants.ERROR_CODES.NOT_FOUND,
        ),
      );
  }

  static handleInternalServerError(res, message) {
    console.error(`Internal Server Error: ${message}`);
    return res
      .status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        ErrorResponse.create(
          message || constants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          constants.ERROR_CODES.INTERNAL_SERVER_ERROR,
        ),
      );
  }

  static handleBadRequest(res, message, errorCode) {
    console.warn(`Bad Request: ${message}`);
    return res
      .status(constants.HTTP_STATUS.BAD_REQUEST)
      .json(
        ErrorResponse.create(
          message || constants.ERROR_MESSAGES.BAD_REQUEST,
          errorCode || constants.ERROR_CODES.BAD_REQUEST,
        ),
      );
  }

  static handleUnauthorized(res, message) {
    console.warn(`Unauthorized: ${message}`);
    return res
      .status(constants.HTTP_STATUS.UNAUTHORIZED)
      .json(
        ErrorResponse.create(
          message || constants.ERROR_MESSAGES.UNAUTHORIZED,
          constants.ERROR_CODES.UNAUTHORIZED,
        ),
      );
  }
}

module.exports = ErrorHandler;
