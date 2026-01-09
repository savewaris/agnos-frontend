# Agnos Front-end Developer Assignment

This project is a real-time patient intake system built with Next.js, TailwindCSS, and Socket.io.

## Features
- **Real-time Synchronization**: Patient inputs are mirrored instantly to the staff dashboard.
- **Responsive Design**: Fully responsive UI for mobile and desktop.
- **Form Validation**: Robust validation using Zod and React Hook Form.
- **Status Tracking**: Staff can see if a patient is currently filling the form or submitted.

## Tech Stack
- **Framework**: Next.js (Pages Router / Custom Server)
- **Styling**: TailwindCSS
- **Real-time**: Socket.io
- **Validation**: Zod, React Hook Form
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js 18+

### Installation
```bash
npm install
```

### Running Locally
To support WebSockets with Next.js in the same process, we use a custom server.

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

- **Patient Portal**: [http://localhost:3000/patient](http://localhost:3000/patient)
- **Staff View**: [http://localhost:3000/staff](http://localhost:3000/staff)

### Building for Production
```bash
npm run build
npm start
```

## Deployment
This application uses a custom Node.js server. Please deploy to a platform that supports long-running Node.js processes (e.g., Railway, Render, Heroku, DigitalOcean App Platform). **Do not deploy to Vercel standard environment** as it does not support long-running WebSocket servers in serverless functions.
