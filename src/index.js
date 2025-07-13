import express from 'express';
import challengesRouter from './routes/challenges.js';
import submissionsRouter from './routes/submissions.js';
import previewRouter from './routes/preview.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/challenges', challengesRouter);
app.use('/submissions', submissionsRouter);
app.use('/preview', previewRouter);

// 404 handler for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use(errorHandler);

/**
 * Start the Express server
 */
function startServer() {
  app.listen(PORT, () => {
    console.log('\n😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂');
    console.log('😂                                                            😂');
    console.log('😂   ██████╗ ██╗ ██████╗  ██████╗ ██╗     ██╗     ███████╗    😂');
    console.log('😂  ██╔════╝ ██║██╔════╝ ██╔════╝ ██║     ██║     ██╔════╝    😂');
    console.log('😂  ██║  ███╗██║██║  ███╗██║  ███╗██║     ██║     █████╗      😂');
    console.log('😂  ██║   ██║██║██║   ██║██║   ██║██║     ██║     ██╔══╝      😂');
    console.log('😂  ╚██████╔╝██║╚██████╔╝╚██████╔╝███████╗███████╗███████╗    😂');
    console.log('😂   ╚═════╝ ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚══════╝    😂');
    console.log('😂                                                            😂');
    console.log('😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂');
    console.log('');
    console.log('🚀 GIGGLE Server launched successfully on port ' + PORT + ' ');
    console.log('📡 API endpoints ready for requests (and giggles!) ');
    console.log('🔗 Base URL: http://localhost:' + PORT + ' ');
    console.log('📚 Check README.md for API documentation \n');
  });
}

startServer();
