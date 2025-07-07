# Placement Preparation Platform

A full-stack monorepo for a Placement Preparation Platform, featuring:

- **Admin Frontend**: Manage quizzes, jobs, and users.
- **Backend**: REST API with authentication, quiz/job management, and file uploads.

---

## Project Structure

```
admin-frontend/   # React + Vite + TypeScript (Admin Panel)
user-frontend/    # React + Vite + TypeScript (User Portal)
backend/          # Node.js + Express + TypeScript + Prisma (API)
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- [Vercel CLI](https://vercel.com/docs/cli) (for deployment)
- MySQL database (for production)

---

### 1. Clone the Repository

```sh
git clone https://github.com/your-org/placement-preparation-platform.git
cd placement-preparation-platform
```

---

### 2. Setup Environment Variables

#### Backend

Copy `.env.example` to `.env` in `backend/` and fill in your secrets:

```sh
cp backend/.env.example backend/.env
```

- Configure your database URL, JWT secrets, mailer credentials, etc.

#### User Frontend

Copy `.env.example` to `.env` in `user-frontend/` and set the API URL and OAuth client ID:

```sh
cp user-frontend/.env.example user-frontend/.env
```

#### Admin Frontend

If needed, add environment variables to `admin-frontend/.env`.

---

### 3. Install Dependencies

```sh
npm install --workspaces
```

Or install in each folder:

```sh
cd backend && npm install
cd ../admin-frontend && npm install
cd ../user-frontend && npm install
```

---

### 4. Database Setup

```sh
cd backend
npx prisma migrate deploy
npx prisma generate
```

---

### 5. Development

#### Backend

```sh
cd backend
npm run dev
```

#### Admin Frontend

```sh
cd admin-frontend
npm run dev
```

#### User Frontend

```sh
cd user-frontend
npm run dev
```

- Admin: [http://localhost:5173](http://localhost:5173)
- User: [http://localhost:5174](http://localhost:5174)
- API: [http://localhost:5000](http://localhost:5000)

---

## Deployment

Both frontends are configured for [Vercel](https://vercel.com/) via `vercel.json`.

- Push to your GitHub repo and import each frontend as a separate Vercel project.
- Set environment variables in Vercel dashboard as needed.

The backend can be deployed to [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions) or a traditional Node.js host.

---

## Features

### Admin Panel

- Secure login/logout
- Upload questions via Excel
- Manage users and jobs
- Rich text editor for job descriptions

### User Portal

- Google OAuth login/signup
- Take quizzes by category/difficulty
- Review previous quizzes and analytics
- View and apply for jobs

### Backend

- RESTful API (Express)
- JWT authentication (access/refresh tokens)
- File uploads (Cloudinary integration)
- Prisma ORM (MySQL)
- Email notifications (nodemailer)

---

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Zustand, Radix UI, Lucide Icons
- **Backend**: Node.js, Express, TypeScript, Prisma, MySQL, Cloudinary, Nodemailer
- **Deployment**: Vercel

---

## Scripts

Each package supports:

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build (frontend)
- `npm run lint` – Lint code

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## License

[MIT](LICENSE)

---

## Authors

- Ashwani Sharma
- Vansh Shrivastava

---

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Prisma](https://www.prisma.io/)
- [Vercel](https://vercel.com/)
