live - [fancy-rolypoly-c207ef.netlify.app](https://fancy-rolypoly-c207ef.netlify.app/)
# luxury-ecomm

A luxury e-commerce application built with React, Vite, Tailwind CSS, Express, and MongoDB. It features smooth scrolling with Lenis and animations with Framer Motion.

## Prerequisites

- Node.js
- MongoDB

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Copy `.env.example` to `.env` and fill in the required values (e.g., MongoDB URI, JWT Secret).
   ```bash
   cp .env.example .env
   ```

## Running the Application

To run both the client and the server concurrently in development mode:

```bash
npm run dev
```

This will start:
- The Vite development server for the React client.
- The Express server for the backend API.

## Project Structure

- `src/`: React client code
- `server/`: Express backend code

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lenis
- **Backend**: Node.js, Express, Mongoose, JSON Web Tokens
