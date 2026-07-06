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
- ✅ Get Student Result API

# REST API

Current Endpoints

POST /api/upload
Upload a university result PDF.

GET /api/students
Retrieve all students.

GET /api/students/:enrollment
Retrieve a student's latest result.

## Coming Soon

- Student Search & Filtering
- Statistics Dashboard
- Result Filtering
- Topper Analysis
- Downloadable Report Cards
- Authentication
- Frontend Dashboard
- Upload History

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

```
result-analyzer/

client/
    Next.js frontend

server/
    Express backend
    Prisma
    PDF Parser
    Database
    API

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

REST API ██████░░░░ 60%

Frontend ░░░░░░░░░░ 0%

---

# Roadmap

## Version 1

- [x] Backend Setup
- [x] Database Design
- [x] PDF Upload
- [x] PDF Parsing
- [x] Student Parser
- [x] Subject Parser
- [x] Result Import
- [x] Pass / Fail Analysis

## Version 2

- [ ] Search API
- [ ] Statistics API
- [ ] Dashboard
- [ ] Upload History
- [ ] Filtering

## Version 3

- [ ] Authentication
- [ ] Admin Panel
- [ ] Report Card Generation
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
