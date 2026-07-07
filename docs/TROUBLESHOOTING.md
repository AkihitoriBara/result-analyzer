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

Some subjects contained "-".

`Number("-")` returned `NaN`.

### Fix

Treat "-" as 0 grade points.

---

# Bug #3

## Prisma

Argument `student` is missing.

### Cause

Wrong relation usage while creating `Result`.

### Fix

Create the Student first and pass `studentId`.

---

# Bug #4

## SubjectResult wasn't saved

### Cause

`SubjectRepository` was never called.

### Fix

After creating `Result`, iterate through every subject and create `SubjectResult`.

---

# Bug #5

## Grade was undefined

### Cause

`SubjectRepository` forgot to send the `grade` field to Prisma.

### Fix

Added

```ts
grade: subject.grade;
```

---

# Bug #6

## With-held students crashed the parser

### Symptoms

SGPA became `NaN`.

### Cause

With-held students have no subject data.

### Fix

Return an empty subject list and zero SGPA values.

---

# Bug #7

## Sustainable Energy omitted the grade column

### Symptoms

The final subject became misaligned.

### Cause

Some PDFs omit the grade while still providing grade points.

### Fix

If no valid grade exists, calculate the grade from the total marks.

---

# Bug #8

## Grades contained whitespace

### Symptoms

Values such as

```
" C "
```

were not recognized.

### Cause

`pdf2json` preserved surrounding whitespace.

### Fix

Use `.trim()` before validating grades.

---

# Bug #9

## Incorrect SGPA and Grade Points

### Symptoms

- SGPA values were much higher than expected.
- Grade points appeared as `0`, `58`, `16`, etc.
- Subject data shifted after the first subject.

### Cause

The parser treated `" C "` as grade points instead of a grade because whitespace prevented recognition.

### Fix

Trim whitespace before checking grades.

```ts
grade = words[index++].trim();

private isGrade(value: string) {
  return ["O", "A+", "A", "B+", "B", "C", "D", "F"].includes(value.trim());
}
```

---

# Bug #10

## PDF Parsing Was Difficult to Debug

### Symptoms

Debugging the parser was difficult because all 145 students were processed during every upload.

### Cause

Large console output made it nearly impossible to identify where parsing first failed.

### Fix

Temporary debugging tools were added to:

- Parse a single student.
- Print raw parser tokens.
- Inspect parser indexes.
- Compare parsed values directly against the original PDF.

All debugging code was removed after the parser was verified.

---

# Lessons Learned

- Never trust PDF formatting.
- Always inspect raw parser tokens.
- Trim extracted text before validation.
- Parser bugs usually cascade into every field after the first mistake.
- Validate parser output against the original PDF, not only against database values.
- Debug one student at a time.
- Separate parsing logic from business logic and database operations.
- Build small, testable layers (Parser → Service → Repository → Controller).
