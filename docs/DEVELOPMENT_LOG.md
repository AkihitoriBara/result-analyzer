# 🛠 Development Log

This document records notable bugs, design mistakes, and debugging techniques encountered during the development of Result Analyzer.

The goal is to document not only **what broke**, but also **why it broke** and **what was learned** while fixing it.

---

# Bug #1 — Student Parser Merged Two Students

## Symptoms

- Incorrect student count
- Subjects from one student appeared under another

## Root Cause

The parser split students correctly during iteration but never pushed the final student into the collection after reaching the end of the document.

## Solution

Added a final guard after the parsing loop.

```ts
if (currentStudent.length > 0) {
  students.push(currentStudent);
}
```

## Lesson

Always verify parser termination conditions when processing streamed or sequential data.

---

# Bug #2 — SGPA Became NaN

## Symptoms

```
SGPA: NaN
```

## Root Cause

Some subject entries contained "-" instead of numeric grade points.

Calling

```ts
Number("-")
```

returned `NaN`.

## Solution

Treat missing grade points as zero.

## Lesson

Never assume extracted PDF values are valid numbers.

---

# Bug #3 — Prisma Relation Error

## Error

```
Argument 'student' is missing.
```

## Root Cause

A `Result` record was created before establishing a valid Student relation.

## Solution

Create (or upsert) the Student first, then use the generated `studentId`.

## Lesson

Understand how ORM relations map to database foreign keys.

---

# Bug #4 — Subject Results Were Never Stored

## Symptoms

Students existed in the database, but no subject records were created.

## Root Cause

The SubjectRepository was never called after creating a Result.

## Solution

Iterate through every parsed subject and persist each SubjectResult.

## Lesson

Verify the complete persistence pipeline, not just the primary entity.

---

# Bug #5 — Grade Was Undefined

## Symptoms

Subject grades were missing from the database.

## Root Cause

The repository omitted the `grade` field when creating records.

## Solution

```ts
grade: subject.grade
```

## Lesson

Ensure DTOs and database models stay synchronized.

---

# Bug #6 — Withheld Students Crashed the Parser

## Symptoms

SGPA became `NaN`.

## Root Cause

Withheld students contain no subject data.

The parser assumed every student had subjects.

## Solution

Return:

- empty subject array
- SGPA = 0
- Credits = 0

## Lesson

Design for incomplete datasets.

---

# Bug #7 — Missing Grade Column

## Symptoms

One subject shifted every value after it.

## Root Cause

Some university PDFs omitted the grade column while still providing grade points.

## Solution

Infer the grade from total marks when necessary.

## Lesson

Real-world documents are rarely perfectly consistent.

---

# Bug #8 — Whitespace Broke Grade Detection

## Symptoms

Grades like

```
" C "
```

were treated as invalid.

## Root Cause

`pdf2json` preserved whitespace.

## Solution

Use

```ts
.trim()
```

before validation.

## Lesson

Normalize all parser input before processing.

---

# Bug #9 — Entire Subject Parsing Shifted

## Symptoms

- Wrong SGPA
- Wrong grade points
- Misaligned subject fields

## Root Cause

Whitespace prevented grade detection, shifting every parser index afterwards.

## Solution

Trim grade values before validation.

```ts
grade = words[index++].trim();

private isGrade(value: string) {
    return VALID_GRADES.includes(value.trim());
}
```

## Lesson

One parser mistake often causes every following field to become incorrect.

---

# Bug #10 — Parser Was Impossible to Debug

## Symptoms

Every upload processed 145 students.

Finding the first parsing error became extremely difficult.

## Solution

Temporary debugging tools were created to:

- Parse a single student
- Print parser tokens
- Inspect parser indexes
- Compare parser output against the PDF

These tools were removed after verification.

## Lesson

Large parsers become much easier to debug when reduced to the smallest reproducible example.

---

# Overall Lessons

Developing Result Analyzer reinforced several software engineering principles.

- Never trust PDF formatting.
- Normalize extracted text immediately.
- Separate parsing, business logic, repositories, and controllers.
- Validate parser output against the original document.
- Debug using the smallest reproducible input.
- Real-world data is rarely perfectly structured.
- Small parser mistakes often cascade into much larger failures.