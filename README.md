# Challenge Submission API

A simplified Challenge Submission API built with Express.js that implements video submission flow with validation and moderation status tracking.

## Features

- **GET /challenges**: Returns 5 dummy challenge objects with id, title, videoUrl, and stickers
- **POST /submissions**: Submit videos for challenges with validation and moderation workflow
- **GET /submissions**: Retrieve all submissions with randomized status updates
- **POST /preview**: Generate mock preview for video URLs (bonus feature)
- **Error handling**: Comprehensive error handling for validation, file operations, and invalid routes
- **Delay simulation**: Middleware to simulate processing delays (1-2 seconds)

## Installation

```bash
npm install
```

## Usage

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on port 3000. You can test the endpoints using:

- `GET http://localhost:3000/challenges`
- `POST http://localhost:3000/submissions`
- `GET http://localhost:3000/submissions`
- `POST http://localhost:3000/preview`

## API Endpoints

### GET /challenges
Returns available challenges for users to participate in.

**Request:**
```http
GET /challenges
```

**Response:**
```json
[
  {
    "id": "challenge-1",
    "title": "Dance Challenge",
    "videoUrl": "https://example.com/dance-challenge.mp4",
    "stickers": ["dance", "music", "fun", "trending"]
  },
  {
    "id": "challenge-2",
    "title": "Cooking Challenge",
    "videoUrl": "https://example.com/cooking-challenge.mp4",
    "stickers": ["cooking", "food", "recipe", "chef"]
  }
]
```

### POST /submissions
Submit a video for a challenge. Requires:
- `videoUrl`: String (required)
- `challengeId`: String (must match existing challenge)
- `stickers`: Array of strings (optional)

**Request:**
```http
POST /submissions
Content-Type: application/json
```

**Payload:**
```json
{
  "videoUrl": "https://example.com/my-video.mp4",
  "challengeId": "challenge-1",
  "stickers": ["dance", "fun"]
}
```

**Success Response:**
```json
{
  "message": "Submission pending review by moderator"
}
```

**Error Response (400):**
```json
{
  "error": "Validation failed",
  "message": "Video duration exceeds 15 seconds limit"
}
```

Validation includes:
- Video URL presence check
- Duration validation (≤ 15 seconds)
- Challenge ID verification

### GET /submissions
Returns all submissions with current status (pending/approved/rejected).

**Request:**
```http
GET /submissions
```

**Response:**
```json
[
  {
    "id": "submission-1673123456789-abc123def",
    "videoUrl": "https://example.com/my-video.mp4",
    "challengeId": "challenge-1",
    "stickers": ["dance", "fun"],
    "status": "approved",
    "createdAt": "2025-07-13T10:30:45.123Z",
    "duration": 12
  },
  {
    "id": "submission-1673123456790-xyz789ghi",
    "videoUrl": "https://example.com/another-video.mp4",
    "challengeId": "challenge-2",
    "stickers": ["cooking"],
    "status": "pending",
    "createdAt": "2025-07-13T11:15:22.456Z",
    "duration": 8
  }
]
```

### POST /preview
Generate a mock preview for a video URL. Requires:
- `videoUrl`: String (required)

**Request:**
```http
POST /preview
Content-Type: application/json
```

**Payload:**
```json
{
  "videoUrl": "https://example.com/preview-video.mp4"
}
```

**Response:**
```json
{
  "videoUrl": "https://example.com/preview-video.mp4",
  "duration": 14,
  "thumbnailUrl": "https://example.com/thumbnails/1673123456789.jpg",
  "isValid": true,
  "metadata": {
    "format": "mp4",
    "resolution": "1080x1920",
    "fileSize": "25MB"
  }
}

## Implementation Notes

- Uses ES modules (import/export)
- File-based storage in `data/submissions.json`
- Simulated video duration validation
- Randomized status updates for demonstration
- Comprehensive error handling with proper HTTP status codes
- Structured logging for operations and startup

## Future Scope

### Submission Approval/Rejection API
A moderation system to approve or reject submissions is planned for future implementation:

#### PATCH /submissions/:id/status
Update the status of a specific submission.

**Request:**
```http
PATCH /submissions/submission-1673123456789-abc123def/status
Content-Type: application/json
```

**Payload:**
```json
{
  "status": "approved",
  "moderatorComment": "Great video! Meets all challenge requirements."
}
```

**Response:**
```json
{
  "id": "submission-1673123456789-abc123def",
  "status": "approved",
  "moderatedAt": "2025-07-13T12:30:45.123Z",
  "moderatorComment": "Great video! Meets all challenge requirements.",
  "message": "Submission status updated successfully"
}
```

**Features to be implemented:**
- Persistent status updates (no more randomized status)
- Moderator comments for approval/rejection reasons
- Timestamp tracking for moderation actions
- Validation to ensure only pending submissions can be moderated
- Support for status values: `approved`, `rejected`
- Optional moderator identification
- Notification system for submission creators

## Requirements

- Node.js 18+
- Express.js 4.18+
