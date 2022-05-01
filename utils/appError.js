// Cutoms error
const AppError = function (message, statusCode) {
  Erro.call(this, message);
  this.message = message;
  this.statusCode = statusCode;
  this.status = `${this.statusCode}`.startsWith("4") ? "FAIL" : "SUCCESS";
  this.isOperational = true;
  Erro.captureStackTrace(this, this.constructor);
};

module.exports = AppError;
