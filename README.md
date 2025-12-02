# Simple Solution - Agency Website

A modern, responsive agency website built with React and TypeScript, featuring a contact form integrated with n8n workflows for automated lead management.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Contact Form**: Integrated contact form with validation and sanitization
- **n8n Integration**: Automated workflow triggers for lead management
- **Security**: Rate limiting, input validation, and XSS protection
- **Performance**: Optimized with Vite for fast development and builds
- **Accessibility**: WCAG compliant with keyboard navigation support

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Axios** - HTTP client for n8n integration
- **express-rate-limit** - Rate limiting middleware
- **CORS** - Cross-origin resource sharing

### Integrations
- **n8n** - Workflow automation platform

## 📁 Project Structure

```
simple-solution-main/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Rate limiting, validation, sanitization
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic (n8n integration)
│   │   └── types/          # TypeScript type definitions
│   ├── .env.example        # Environment variables template
│   └── package.json
├── src/                    # Frontend source code
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and API client
│   ├── pages/             # Page components
│   └── assets/            # Images and static assets
├── public/                # Static public assets
├── .env.example           # Frontend environment variables template
└── package.json
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18+ and npm (or use [nvm](https://github.com/nvm-sh/nvm))
- **n8n account** with a webhook workflow set up

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Musab712/simple_solution.git
   cd simple_solution
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**

   **Backend** (create `backend/.env`):
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Edit `backend/.env`:
   ```env
   N8N_WEBHOOK_URL=your-n8n-webhook-url-here
   FRONTEND_URL=http://localhost:8080
   PORT=3000
   NODE_ENV=development
   ```

   **Frontend** (create `.env` in root):
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

5. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Backend runs on `http://localhost:3000`

   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:8080`

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `N8N_WEBHOOK_URL` | Your n8n workflow webhook URL | ✅ Yes | - |
| `FRONTEND_URL` | Frontend URL for CORS (comma-separated for multiple) | No | `http://localhost:8080` |
| `PORT` | Backend server port | No | `3000` |
| `NODE_ENV` | Environment mode | No | `development` |

### Frontend (`.env`)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API URL | No | `http://localhost:3000/api` |

## 💻 Development

### Frontend Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Scripts

```bash
cd backend
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Run production server
npm run type-check   # Type check without building
npm test             # Run tests
```

### Code Structure

- **Components**: Located in `src/components/`
- **Pages**: Located in `src/pages/`
- **API Client**: Located in `src/lib/api.ts`
- **Backend Routes**: Located in `backend/src/routes/`
- **Backend Services**: Located in `backend/src/services/`

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### POST `/api/contact/submit`

Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",  // optional
  "message": "Your message here"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully! We will get back to you soon."
}
```

**Error Response (400/429/500):**
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    }
  ]
}
```

**Rate Limiting**: 5 requests per 15 minutes per IP address

#### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### n8n Integration

When a contact form is submitted, the backend sends a POST request to your n8n webhook with the following payload:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Your message here",
  "submittedAt": "2024-01-01T00:00:00.000Z"
}
```

**n8n Workflow Setup:**
1. Create a webhook trigger node in n8n
2. Configure it to accept POST requests
3. Copy the webhook URL to `N8N_WEBHOOK_URL` in your backend `.env`
4. Add nodes to process the data (e.g., save to database, send email)

## 🏗 Building for Production

### Frontend

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Backend

```bash
cd backend
npm run build
```

The compiled JavaScript will be in `backend/dist/`.

Run the production server:
```bash
npm start
```

## 🚢 Deployment

### Frontend Deployment

The frontend can be deployed to any static hosting service:
- **Vercel**: Connect your GitHub repo and deploy
- **Netlify**: Connect your GitHub repo and deploy
- **GitHub Pages**: Use GitHub Actions to build and deploy

**Build Command**: `npm run build`  
**Output Directory**: `dist`

### Backend Deployment

The backend can be deployed to:
- **Railway**: Connect your GitHub repo and set environment variables
- **Render**: Connect your GitHub repo and set environment variables
- **Heroku**: Use the Node.js buildpack
- **DigitalOcean App Platform**: Connect your GitHub repo
- **AWS/Google Cloud/Azure**: Use their respective Node.js hosting services

**Important**: Make sure to set all environment variables in your hosting platform.

### Environment Variables for Production

Update your frontend `.env` or build-time variables:
```env
VITE_API_URL=https://your-backend-url.com/api
```

Update your backend environment variables:
```env
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/...
FRONTEND_URL=https://your-frontend-url.com
PORT=3000
NODE_ENV=production
```

## 🔒 Security Features

- ✅ **Rate Limiting**: Prevents spam and abuse (5 requests per 15 minutes)
- ✅ **Input Validation**: Zod schema validation on all inputs
- ✅ **Input Sanitization**: XSS protection on user inputs
- ✅ **CORS Protection**: Configurable allowed origins
- ✅ **Environment Variables**: Sensitive data stored securely
- ✅ **Type Safety**: TypeScript throughout the codebase

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

Tests are located in `backend/src/middleware/__tests__/` and `src/lib/__tests__/`.

## 📝 License

ISC

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue on [GitHub](https://github.com/Musab712/simple_solution/issues).

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [n8n](https://n8n.io/) for workflow automation
- [Vite](https://vitejs.dev/) for the build tool

---

Made with ❤️ by Simple Solution
