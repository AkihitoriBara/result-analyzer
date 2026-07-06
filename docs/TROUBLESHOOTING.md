# Result Analyzer Development Log

This document records major bugs encountered during development and how they were solved.

---

# Bug #1

## Student parser merged two students together

### Symptoms

- Incorrect student count
- Subjects from one student appeared under another

### Cause

Student splitting logic never pushed the final student into the array.

### Fix

Added

```ts
if (currentStudent.length > 0) {
  students.push(currentStudent);
}
```

---

# Bug #2

## SGPA became NaN

### Symptoms

```
SGPA: NaN
```

### Cause

Some subjects contained "-"

Number("-") returned NaN.

### Fix

Treat "-" as 0 grade points.

---

# Bug #3

## Prisma

Argument student is missing

### Cause

Wrong relation usage while creating Result.

### Fix

Create Student first.
Pass studentId.

---

# Bug #4

## SubjectResult wasn't saved

### Cause

SubjectRepository was never called.

### Fix

After creating Result, iterate through every subject and create SubjectResult.

---

# Bug #5

## Grade undefined

### Cause

SubjectRepository forgot to send

grade

to Prisma.

### Fix

Added

grade: subject.grade

---

# Bug #6

## With-held students crashed parser

### Symptoms

SGPA became NaN.

### Cause

With-held students have no subject data.

### Fix

Return empty subject list.

---

# Bug #7

## Sustainable Energy omitted grade

### Symptoms

Last subject became misaligned.

### Cause

Some PDFs omit the grade but keep grade points.

### Fix

If no valid grade exists, calculate grade from total marks.

---

# Bug #8

## Grade contained whitespace

### Symptoms

"C"

was not recognized.

### Cause

pdf2json returned

" C "

instead of

"C"

### Fix

Use

.trim()

before checking grades.

---

# Lessons Learned

- Never trust PDF formatting.
- Always inspect raw tokens.
- Debug one student at a time.
- Validate parser output against the original PDF.
- Separate parser logic from database logic.
