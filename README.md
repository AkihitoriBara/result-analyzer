# 📄 Result Analyzer

A full-stack web application that converts university semester result PDFs into a searchable academic database.

The system automatically extracts students, subjects, grades, SGPA, credits and pass/fail information from official university result sheets and stores them in PostgreSQL for further analysis.

---

# ✨ Features

## Completed

- ✅ PDF Upload API
- ✅ Automatic PDF Parsing
- ✅ Student Extraction
- ✅ Subject Extraction
- ✅ SGPA Calculation
- ✅ Total Credits Calculation
- ✅ Grade Point Calculation
- ✅ Automatic Pass / Fail Detection
- ✅ Duplicate Student Prevention (Upsert)
- ✅ PostgreSQL Database Integration
- ✅ Relational Database Design
- ✅ Pass Criteria Storage
- ✅ Student Result API
- ✅ Student Search API
- ✅ Statistics API
- ✅ Upload History API
- ✅ Topper API
- ✅ Top 10 Toppers API

---

# REST API

## Upload

POST `/api/upload`

Upload a university result PDF.

GET `/api/uploads`

Retrieve upload history.

---

## Students

GET `/api/students`

Retrieve all students.

GET `/api/students/:enrollment`

Retrieve a student's latest result.

GET `/api/students/search?enrollment=2501442132`

Search a student by enrollment number.

---

## Statistics

GET `/api/statistics`

Retrieve overall class statistics.

---

## Results

GET `/api/results/topper`

Retrieve the class topper.

GET `/api/results/top10`

Retrieve the Top 10 students by SGPA.

---

## Coming Soon

- Result Filtering
- Dashboard
- Authentication
- Admin Panel
- Report Card Generation
- Subject Statistics
- Upload Comparison
- Frontend Dashboard

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- shadcn/ui

## Backend

- Express
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- Multer
- pdf2json

---

# 📂 Project Structure

```text
result-analyzer/

client/
    Next.js frontend

server/
    Express backend
    Prisma
    PDF Parser
    Database
    API

docs/
    development_log.md

README.md
```

---

# Database

Current database tables

- Student
- Result
- SubjectResult
- Upload
- PassCriteria

Relationships

Student
└── Results
└── Subject Results

Upload
└── Results

PassCriteria
└── Upload

---

# Current Progress

Backend Setup ██████████ 100%

Database Design ██████████ 100%

PDF Upload ██████████ 100%

PDF Parsing ██████████ 100%

Result Import ██████████ 100%

REST API ██████████ 100%

Frontend ░░░░░░░░░░ 0%

---

# Roadmap

## Version 1 ✅

- [x] Backend Setup
- [x] Database Design
- [x] PDF Upload
- [x] PDF Parsing
- [x] Student Parser
- [x] Subject Parser
- [x] Result Import
- [x] Pass / Fail Analysis
- [x] Student Search
- [x] Statistics API
- [x] Upload History API
- [x] Topper API
- [x] Top 10 API

## Version 2

- [ ] Dashboard
- [ ] Authentication
- [ ] Upload Comparison
- [ ] Result Filtering
- [ ] Subject Statistics
- [ ] Report Card Generation

## Version 3

- [ ] Admin Panel
- [ ] User Accounts
- [ ] Semester Comparison
- [ ] Deployment

---

# Goal

Transform large university result PDFs into structured relational data that can be searched, analyzed and visualized through a modern web interface.

---

# Author

Built as a personal learning project to explore:

- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- PDF Parsing
- Backend Architecture
- REST API Design
