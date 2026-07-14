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
- Hardest subject detection
- Easiest subject detection
- Highest subject average
- Lowest subject average
- Detailed subject breakdown

---

## ⚙ Backend

- REST API
- PostgreSQL integration
- Prisma ORM
- Relational database
- Upload history
- Statistics aggregation
- Topper calculation

---

# 📷 Screenshots

> Screenshots will be added after Version 1 release.

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
- PostgreSQL
- Multer
- pdf2json

---

# 📂 Project Structure

```text
result-analyzer/

client/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── types/
│
server/
│
├── src/
│   ├── controllers/
│   ├── services/
│   ├── parser/
│   ├── database/
│   ├── routes/
│   └── middleware/
│
README.md
```

---

# 🌐 REST API

## Uploads

| Method | Endpoint |
|--------|----------|
| POST | `/api/upload` |
| GET | `/api/uploads` |

---

## Students

| Method | Endpoint |
|--------|----------|
| GET | `/api/students` |
| GET | `/api/students/:enrollment` |
| GET | `/api/students/search?enrollment=...` |

---

## Results

| Method | Endpoint |
|--------|----------|
| GET | `/api/results/topper` |
| GET | `/api/results/top10` |

---

## Statistics

| Method | Endpoint |
|--------|----------|
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

# 🚀 Current Progress

Backend ██████████ 100%

Frontend ██████████ 100%

Analytics ██████████ 100%

Version 1 ██████████ 100%

---

# 🛣 Roadmap

## ✅ Version 1

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
- Deployment

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

---

# 📄 License

This project is licensed under the MIT License.