# 🏗 System Architecture

This document explains how Result Analyzer is organized internally and how data flows through the application.

---

# High-Level Architecture

```text
                    University Result PDF
                             │
                             ▼
                      Upload API (Express)
                             │
                             ▼
                     PDF Parser (pdf2json)
                             │
                             ▼
                      Student Parser
                             │
                             ▼
                      Subject Parser
                             │
                             ▼
                     Business Services
                             │
                             ▼
                  Prisma ORM + PostgreSQL
                             │
                             ▼
                       REST API Layer
                             │
                             ▼
                   Next.js Frontend Dashboard
```

---

# Technology Stack

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

Responsibilities

- Upload PDFs
- Display student directory
- Show dashboard statistics
- Visualize academic analytics
- Consume REST API

---

## Backend

- Express
- TypeScript
- Prisma ORM

Responsibilities

- Receive uploaded PDFs
- Parse result documents
- Store structured data
- Expose REST APIs
- Calculate analytics

---

## Database

PostgreSQL hosted on Neon.

The database stores:

- Students
- Results
- Subject Results
- Upload History
- Pass Criteria

Prisma ORM is responsible for communicating with the database.

---

# Request Flow

A typical upload follows the workflow below.

```text
User uploads PDF
        │
        ▼
Upload Route
        │
        ▼
Upload Controller
        │
        ▼
Upload Service
        │
        ▼
Result PDF Parser
        │
        ├── Student Parser
        └── Subject Parser
        │
        ▼
Repositories
        │
        ▼
PostgreSQL
```

---

# Analytics Flow

Statistics are generated dynamically.

```text
Database
      │
      ▼
Statistics Repository
      │
      ▼
Statistics Service
      │
      ├── Overall Statistics
      ├── Subject Statistics
      ├── Hardest Subject
      ├── Easiest Subject
      ├── Highest Average
      └── Lowest Average
      │
      ▼
REST API
      │
      ▼
Dashboard Components
```

---

# Project Layers

The backend follows a layered architecture.

## Routes

Receive HTTP requests.

Example

```
GET /api/statistics
```

Responsibilities

- URL mapping
- Middleware
- Controller selection

---

## Controllers

Controllers should remain thin.

Responsibilities

- Receive request
- Validate input
- Call services
- Return HTTP response

Business logic is intentionally avoided.

---

## Services

Services contain the application's business logic.

Examples

- Parsing PDFs
- Calculating statistics
- Student search
- Upload processing

Services coordinate repositories but do not directly interact with HTTP.

---

## Repositories

Repositories communicate with Prisma.

Responsibilities

- Create records
- Read records
- Update records
- Delete records

Keeping database logic isolated makes services easier to test and maintain.

---

## Parsers

Parsers are responsible only for converting PDF text into structured data.

Responsibilities

- Token processing
- Student extraction
- Subject extraction
- Grade detection

Parsers do not communicate with the database.

---

# Frontend Architecture

The frontend is organized by responsibility.

```text
app/
    Pages

components/
    Reusable UI

services/
    API communication

types/
    Shared TypeScript models

lib/
    Shared utilities
```

---

# Design Principles

The project follows several design principles.

- Separation of concerns
- Layered architecture
- Reusable components
- Single responsibility
- Strong typing with TypeScript
- RESTful API design

---

# Deployment Architecture

```text
                 User Browser
                       │
                       ▼
               Vercel (Frontend)
                       │
             REST API Requests
                       │
                       ▼
             Render (Backend API)
                       │
                       ▼
             Neon PostgreSQL Database
```

---

# Future Architecture Improvements

Version 2 and later will introduce additional architectural improvements.

Planned additions include:

- Authentication layer
- Background job processing
- Multi-semester support
- Caching
- File storage abstraction
- Role-based authorization
- AI-powered analytics