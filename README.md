# 📊 Result Analyzer

A full-stack academic analytics platform that converts university semester result PDFs into a searchable database and interactive dashboard.

The application automatically extracts students, subjects, grades, SGPA, credits, and pass/fail information from official university result sheets, stores them in PostgreSQL, and visualizes class performance through modern analytics.

---

# ✨ Features

## 📥 Result Processing

- Upload official university result PDFs
- Automatic PDF parsing
- Student extraction
- Subject extraction
- SGPA calculation
- Credit calculation
- Grade point calculation
- Automatic pass/fail detection
- Duplicate student prevention (Upsert)

---

## 👨‍🎓 Student Management

- Student directory
- Enrollment search
- Expandable student result cards
- Subject-wise mark breakdown
- Latest result retrieval

---

## 📈 Analytics Dashboard

- Dashboard overview
- Total students
- Pass percentage
- Average / Highest / Lowest SGPA
- Recent uploads
- Top 10 students
- Subject performance radar chart
- Subject comparison chart
- Grade distribution analysis
- Subject topper detection
- Hardest subject detection
- Easiest subject detection
- Highest subject average
- Lowest subject average
- Detailed subject breakdown

---

## ⚙️ Backend

- RESTful API
- PostgreSQL integration
- Prisma ORM
- Relational database design
- Upload history
- Statistics aggregation
- Topper calculation

---

# 📷 Screenshots

### Dashboard

*(Coming soon)*

### Student Directory

*(Coming soon)*

### Upload Management

*(Coming soon)*

### Academic Analytics

*(Coming soon)*

---

# 🛠 Tech Stack

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend

- Express
- TypeScript
- Prisma ORM
- Prisma Client
- PostgreSQL
- Multer
- pdf2json

---

# 📂 Project Structure

```text
result-analyzer/

├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── lib/
│   │   └── types/
│   └── package.json
│
├── server/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── parser/
│   │   ├── database/
│   │   ├── routes/
│   │   └── middleware/
│   └── package.json
│
├── docs/
└── README.md
```

---

# 🌐 REST API

## Uploads

| Method | Endpoint |
|---------|----------|
| POST | `/api/upload` |
| GET | `/api/uploads` |

---

## Students

| Method | Endpoint |
|---------|----------|
| GET | `/api/students` |
| GET | `/api/students/:enrollment` |
| GET | `/api/students/search?enrollment=...` |

---

## Results

| Method | Endpoint |
|---------|----------|
| GET | `/api/results/topper` |
| GET | `/api/results/top10` |

---

## Statistics

| Method | Endpoint |
|---------|----------|
| GET | `/api/statistics` |

---

# 🗄 Database

Current tables

- Student
- Result
- SubjectResult
- Upload
- PassCriteria

Relationships

```text
Student
 └── Result
      └── SubjectResult

Upload
 └── Result

PassCriteria
 └── Upload
```

---

# ⚙️ Environment Variables

This project uses environment variables for configuration.

## Frontend

Create `client/.env.local` using `client/.env.example`.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API |

---

## Backend

Create `server/.env` using `server/.env.example`.

```env
PORT=5000
DATABASE_URL=
JWT_SECRET=your-secret-here
NODE_ENV=development
```

| Variable | Description |
|----------|-------------|
| `PORT` | Server port |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret |
| `NODE_ENV` | Application environment |

### Local Setup

Create the following files before running the project:

```
client/.env.local
server/.env
```

using the provided `.env.example` templates, then update the values to match your local environment.

---

# 🚀 Current Progress

Backend ██████████ 100%

Frontend ██████████ 100%

Analytics ██████████ 100%

Version 1.0 ██████████ 100%

---

# 🛣 Roadmap

## ✅ Version 1.0 (Current)

- PDF Upload
- PDF Parsing
- Student Extraction
- Subject Extraction
- PostgreSQL Integration
- Dashboard
- Student Directory
- Academic Analytics
- Radar Chart
- Subject Comparison
- Top Students
- Upload History

---

## 🚧 Version 2

- Authentication
- Multi-semester support
- Semester comparison
- Advanced filtering
- Export reports
- PDF report generation

---

## 🔮 Version 3

- AI-powered insights
- Faculty dashboard
- Department analytics
- Multi-user support
- Role-based permissions
- Cloud deployment (Vercel + Render)

---

# 🎯 Project Goal

Transform large university result PDFs into structured relational data that can be searched, analyzed, and visualized through a modern academic dashboard.

---

# 📚 What I Learned

This project was built as a personal software engineering project to gain hands-on experience with:

- TypeScript
- React
- Next.js
- Express
- Prisma ORM
- PostgreSQL
- REST API design
- PDF parsing
- Data visualization
- Software architecture
- Full-stack application development
