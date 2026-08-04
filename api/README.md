# API Routes

This folder documents all REST API endpoints. Actual route handlers
live in `/app/api/*/route.ts` (Next.js App Router convention).

## Endpoints

### Authentication
- `POST /api/auth/login` - Sign in with email/password
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/logout` - Sign out
- `POST /api/auth/reset-password` - Send password reset email

### Users
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/:id/posts` - Get user's posts
- `GET /api/users/search` - Search users

### Posts
- `GET /api/posts` - Get feed posts (paginated)
- `POST /api/posts` - Create post
- `GET /api/posts/:id` - Get single post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Toggle like
- `POST /api/posts/:id/save` - Toggle save

### Comments
- `GET /api/posts/:id/comments` - Get comments
- `POST /api/posts/:id/comments` - Add comment
- `DELETE /api/posts/:id/comments/:commentId` - Delete comment

### Stories
- `GET /api/stories` - Get active stories
- `POST /api/stories` - Create story

### Chat
- `GET /api/chat/conversations` - List conversations
- `POST /api/chat/conversations` - Create/get conversation
- `GET /api/chat/conversations/:id/messages` - Get messages
- `POST /api/chat/conversations/:id/messages` - Send message

### Notifications
- `GET /api/notifications` - Get notifications
- `POST /api/notifications/:id/read` - Mark as read

### Reels
- `GET /api/reels` - Get reels feed
- `POST /api/reels` - Create reel

### Premium
- `GET /api/premium/plans` - Get subscription plans
- `POST /api/premium/subscribe` - Subscribe to plan
- `POST /api/premium/cancel` - Cancel subscription

### Advertisements
- `GET /api/advertisements` - Get ad for placement

### Coins
- `GET /api/coins/balance` - Get coin balance
- `GET /api/coins/transactions` - Get transaction history
- `POST /api/coins/transfer` - Transfer coins

### AI
- `POST /api/ai/caption` - Generate AI caption
- `POST /api/ai/moderate` - Moderate content

### Upload
- `POST /api/upload` - Upload media file