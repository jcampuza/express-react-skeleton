// Base Error subclasses
module.exports = {
	UnauthorizedError: class UnauthorizedError extends Error {}, // 401
	ForbiddenError: class ForbiddenError extends Error {}, // 403
	NotFoundError: class NotFoundError extends Error {}, // 404
	ValidationError: class ValidationError extends Error {}, // 422
	ServerError: class ServerError extends Error {}, // 500
}