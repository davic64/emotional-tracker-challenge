const errorHandler = (err, _, res, _) => {
  console.log(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
};

module.exports = errorHandler;
