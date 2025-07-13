/**
 * Dummy challenges data
 */
const CHALLENGES = [
  {
    id: 'challenge-1',
    title: 'Dance Challenge',
    videoUrl: 'https://example.com/dance-challenge.mp4',
    stickers: ['dance', 'music', 'fun', 'trending']
  },
  {
    id: 'challenge-2',
    title: 'Cooking Challenge',
    videoUrl: 'https://example.com/cooking-challenge.mp4',
    stickers: ['cooking', 'food', 'recipe', 'chef']
  },
  {
    id: 'challenge-3',
    title: 'Fitness Challenge',
    videoUrl: 'https://example.com/fitness-challenge.mp4',
    stickers: ['fitness', 'workout', 'health', 'strong']
  },
  {
    id: 'challenge-4',
    title: 'Art Challenge',
    videoUrl: 'https://example.com/art-challenge.mp4',
    stickers: ['art', 'creative', 'drawing', 'artist']
  },
  {
    id: 'challenge-5',
    title: 'Pet Challenge',
    videoUrl: 'https://example.com/pet-challenge.mp4',
    stickers: ['pets', 'cute', 'animals', 'funny']
  }
];

/**
 * Get all available challenges
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function getChallenges(req, res) {
  try {
    console.log('Fetching challenges list');
    
    // Return the static challenges data
    res.json(CHALLENGES);
    
    console.log(`Successfully returned ${CHALLENGES.length} challenges`);
  } catch (error) {
    console.error('Error fetching challenges:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch challenges'
    });
  }
}
