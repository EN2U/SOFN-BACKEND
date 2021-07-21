class ErrorRequest extends Error {
  constructor (message, status) {
    super(message)
    this.name = 'Custom Error'
    this.status = status
    Error.captureStackTrace(this, ErrorRequest)
  }
}

module.exports = ErrorRequest
