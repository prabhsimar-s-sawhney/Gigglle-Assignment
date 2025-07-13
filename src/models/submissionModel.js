import { readSubmissions, writeSubmissions } from '../utils/fileStore.js';

/**
 * Create a new submission record
 * @param {Object} submission - Submission data to save
 * @returns {Promise<Object>} The created submission
 */
export async function createSubmissionRecord(submission) {
  try {
    console.log(`Creating submission record: ${submission.id}`);
    
    // Read existing submissions
    const submissions = await readSubmissions();
    
    // Add new submission
    submissions.push(submission);
    
    // Write back to file
    await writeSubmissions(submissions);
    
    console.log(`Submission record created successfully: ${submission.id}`);
    
    return submission;
  } catch (error) {
    console.error('Error creating submission record:', error.message);
    throw new Error('Failed to create submission record');
  }
}

/**
 * Get all submission records
 * @returns {Promise<Array>} Array of all submissions
 */
export async function getAllSubmissions() {
  try {
    console.log('Fetching all submission records');
    
    const submissions = await readSubmissions();
    
    console.log(`Retrieved ${submissions.length} submission records`);
    
    return submissions;
  } catch (error) {
    console.error('Error fetching submission records:', error.message);
    throw new Error('Failed to fetch submission records');
  }
}

/**
 * Get submission by ID
 * @param {string} id - Submission ID
 * @returns {Promise<Object|null>} Submission object or null if not found
 */
export async function getSubmissionById(id) {
  try {
    console.log(`Fetching submission by ID: ${id}`);
    
    const submissions = await readSubmissions();
    const submission = submissions.find(sub => sub.id === id);
    
    if (submission) {
      console.log(`Found submission: ${id}`);
    } else {
      console.log(`Submission not found: ${id}`);
    }
    
    return submission || null;
  } catch (error) {
    console.error('Error fetching submission by ID:', error.message);
    throw new Error('Failed to fetch submission');
  }
}
