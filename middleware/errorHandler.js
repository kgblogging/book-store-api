function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack for debugging

    let statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";

    // Send error response
    res.status(statusCode).json({
        success: false,
        message,
    });
}

module.exports = errorHandler;
