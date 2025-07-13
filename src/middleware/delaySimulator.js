/**
 * Middleware to simulate processing delay
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export function delaySimulator(req, res, next) {
  // Generate random delay between 1000ms and 2000ms
  const delay = Math.floor(Math.random() * 1000) + 1000;
  
  console.log(`Simulating processing delay: ${delay}ms`);
  
  setTimeout(() => {
    next();
  }, delay);
}
