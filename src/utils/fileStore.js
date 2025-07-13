import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the submissions data file
const SUBMISSIONS_FILE = join(__dirname, '../../data/submissions.json');

/**
 * Read submissions from the JSON file
 * @returns {Promise<Array>} Array of submission objects
 */
export async function readSubmissions() {
  try {
    console.log('Reading submissions from file store');
    
    const data = await readFile(SUBMISSIONS_FILE, 'utf8');
    const submissions = JSON.parse(data);
    
    console.log(`Successfully read ${submissions.length} submissions from file store`);
    
    return submissions;
  } catch (error) {
    // If file doesn't exist, return empty array
    if (error.code === 'ENOENT') {
      console.log('Submissions file not found, returning empty array');
      return [];
    }
    
    console.error('Error reading submissions file:', error.message);
    throw new Error('Failed to read submissions from file store');
  }
}

/**
 * Write submissions to the JSON file
 * @param {Array} submissions - Array of submission objects to write
 * @returns {Promise<void>}
 */
export async function writeSubmissions(submissions) {
  try {
    console.log('Writing submissions to file store');
    
    // Convert to JSON with proper formatting
    const jsonData = JSON.stringify(submissions, null, 2);
    
    // Write to file
    await writeFile(SUBMISSIONS_FILE, jsonData, 'utf8');
    
    console.log(`Successfully wrote ${submissions.length} submissions to file store`);
  } catch (error) {
    console.error('Error writing submissions file:', error.message);
    throw new Error('Failed to write submissions to file store');
  }
}

/**
 * Append a single submission to the file
 * @param {Object} submission - Submission object to append
 * @returns {Promise<void>}
 */
export async function appendSubmission(submission) {
  try {
    console.log(`Appending submission to file store: ${submission.id}`);
    
    // Read existing submissions
    const submissions = await readSubmissions();
    
    // Add new submission
    submissions.push(submission);
    
    // Write back to file
    await writeSubmissions(submissions);
    
    console.log(`Successfully appended submission: ${submission.id}`);
  } catch (error) {
    console.error('Error appending submission:', error.message);
    throw new Error('Failed to append submission to file store');
  }
}
