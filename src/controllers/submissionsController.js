import { createSubmissionRecord, getAllSubmissions } from '../models/submissionModel.js';

/**
 * Valid challenge IDs for validation
 */
const VALID_CHALLENGE_IDS = [
  'challenge-1',
  'challenge-2', 
  'challenge-3',
  'challenge-4',
  'challenge-5'
];

/**
 * Simulate video duration check
 * @param {string} videoUrl - URL of the video to check
 * @returns {number} Simulated duration in seconds
 */
function simulateVideoDuration(videoUrl) {
  // Generate a semi-random duration based on URL hash
  const hash = videoUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return (hash % 20) + 1; // Duration between 1-20 seconds
}

/**
 * Create a new submission
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function createSubmission(req, res) {
  try {
    const { videoUrl, challengeId, stickers = [] } = req.body;
    
    console.log('Processing new submission request');
    
    // Validation: Check if videoUrl is present
    if (!videoUrl || typeof videoUrl !== 'string') {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'videoUrl is required and must be a string'
      });
    }
    
    // Validation: Check if challengeId is present and valid
    if (!challengeId || !VALID_CHALLENGE_IDS.includes(challengeId)) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'challengeId is required and must be a valid challenge ID'
      });
    }
    
    // Validation: Check stickers format
    if (!Array.isArray(stickers)) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'stickers must be an array'
      });
    }
    
    // Simulate video duration check
    const duration = simulateVideoDuration(videoUrl);
    if (duration > 15) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Video duration exceeds 15 seconds limit'
      });
    }
    
    // Create submission record
    const submission = {
      id: `submission-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      videoUrl,
      challengeId,
      stickers,
      status: 'pending',
      createdAt: new Date().toISOString(),
      duration
    };
    
    // Save to file store
    await createSubmissionRecord(submission);
    
    console.log(`Submission created successfully: ${submission.id}`);
    
    res.status(201).json({
      message: 'Submission pending review by moderator'
    });
    
  } catch (error) {
    console.error('Error creating submission:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create submission'
    });
  }
}

/**
 * Get all submissions with randomized status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function getSubmissions(req, res) {
  try {
    console.log('Fetching all submissions');
    
    const submissions = await getAllSubmissions();
    
    // Randomize status for each submission
    const submissionsWithStatus = submissions.map(submission => {
      const statuses = ['pending', 'approved', 'rejected'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        ...submission,
        status: randomStatus
      };
    });
    
    console.log(`Successfully returned ${submissionsWithStatus.length} submissions`);
    
    res.json(submissionsWithStatus);
    
  } catch (error) {
    console.error('Error fetching submissions:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch submissions'
    });
  }
}

/**
 * Generate mock preview for video URL
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function previewVideo(req, res) {
  try {
    const { videoUrl } = req.body;
    
    console.log('Generating video preview');
    
    // Validation: Check if videoUrl is present
    if (!videoUrl || typeof videoUrl !== 'string') {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'videoUrl is required and must be a string'
      });
    }
    
    // Generate mock preview data
    const duration = simulateVideoDuration(videoUrl);
    const preview = {
      videoUrl,
      duration,
      thumbnailUrl: `https://example.com/thumbnails/${Date.now()}.jpg`,
      isValid: duration <= 15,
      metadata: {
        format: 'mp4',
        resolution: '1080x1920',
        fileSize: Math.floor(Math.random() * 50) + 10 + 'MB'
      }
    };
    
    console.log(`Preview generated for video: ${videoUrl}`);
    
    res.json(preview);
    
  } catch (error) {
    console.error('Error generating preview:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate preview'
    });
  }
}
