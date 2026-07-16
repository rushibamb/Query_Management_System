# Customer Query Management System (QMS)

A modern Customer Query Management System (QMS) dashboard designed to act as an internal CRM for customer support operations. Built with simplicity, clean code standards, and performance in mind.

## Project Overview
The QMS helps support agents view, search, filter, paginate, and track client queries efficiently. It prioritizes operational transparency through active states, soft deletion, and status triaging.

## Tech Stack
* **Frontend:** React (Vite, JavaScript), Tailwind CSS, React Router DOM, Axios, React Hot Toast
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose

## Features
*(To be completed during implementation)*

## Folder Structure
```text
d:/QMS/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── common/
│       │   ├── layout/
│       │   └── query/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       └── utils/
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── utils/
```

## Installation

### 1. Clone & Scaffolding Setup
Navigate to your project directory:
```bash
git clone <repository-url>
```

### 2. Backend Setup
1. Navigate to `/server`.
2. Create your `.env` file based on `.env.example`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to `/client`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development environment:
   ```bash
   npm run dev
   ```

## Available Scripts

### Frontend (`/client`)
* `npm run dev` - Run Vite development server local instance.
* `npm run build` - Bundle production output elements.

### Backend (`/server`)
* `npm run dev` - Start Nodemon live refresh API listener.
* `npm start` - Boot standard Production Node process.
