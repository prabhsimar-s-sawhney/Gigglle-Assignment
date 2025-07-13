/**
 * Global error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export function errorHandler(err, req, res, next) {
  console.error('Unhandled error:', err.message);
  console.error('Stack trace:', err.stack);
  
  // Handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'Invalid JSON',
      message: 'Request body contains invalid JSON'
    });
  }
  
  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      message: err.message
    });
  }
  
  // Handle file system errors
  if (err.code === 'ENOENT') {
    return res.status(500).json({
      error: 'File not found',
      message: 'Required data file is missing'
    });
  }
  
  if (err.code === 'EACCES') {
    return res.status(500).json({
      error: 'Permission denied',
      message: 'Cannot access required files'
    });
  }
  
  // Default error response
  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred'
  });
}
