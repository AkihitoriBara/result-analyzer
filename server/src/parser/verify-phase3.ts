import path from "path";
import fs from "fs";
import { ResultPdfParser } from "./result-pdf.parser.js";
import { StudentResult } from "../types/student.types.js";

const pdfAPath = path.resolve("../docs/sample-data/semester4_results.pdf.pdf");
const pdfBPath = path.resolve("../docs/sample-data/UG24_BTECH-CSE_SEM-4.pdf");
const baselinePath = path.resolve("src/parser/__tests__/baseline.json");

export async function runVerification() {
  console.log("=========================================");
  console.log("RUNNING PHASE 3 VERIFICATION SCRIPT");
  console.log("=========================================");

  const parser = new ResultPdfParser();

  // Parse PDF A
  console.log("\nParsing PDF A (semester4_results.pdf.pdf)...");
  const pdfAResults = await parser.extractText(pdfAPath);
  console.log(`PDF A Parsed Students Count: ${pdfAResults.length}`);

  // Compare with baseline JSON
  let baselineEqual = false;
  if (!fs.existsSync(baselinePath)) {
    const dir = path.dirname(baselinePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(baselinePath, JSON.stringify(pdfAResults, null, 2));
    console.log(`Saved baseline snapshot to ${baselinePath}`);
    baselineEqual = true;
  } else {
    const baselineData = JSON.parse(fs.readFileSync(baselinePath, "utf-8"));
    const currentJson = JSON.stringify(pdfAResults);
    const baselineJson = JSON.stringify(baselineData);
    baselineEqual = currentJson === baselineJson;
    console.log(`PDF A Baseline Equality Check: ${baselineEqual ? "PASS (100% Equal)" : "FAIL"}`);
  }

  // Parse PDF B
  console.log("\nParsing PDF B (UG24_BTECH-CSE_SEM-4.pdf)...");
  let pdfBResults: StudentResult[] = [];
  let pdfBError: any = null;
  try {
    pdfBResults = await parser.extractText(pdfBPath);
    console.log(`PDF B Parsed Students Count: ${pdfBResults.length}`);
  } catch (err) {
    pdfBError = err;
    console.error("PDF B Parsing Error:", err);
  }

  console.log("\n--- PDF A Summary ---");
  console.log(`Count: ${pdfAResults.length}`);
  if (pdfAResults.length > 0) {
    console.log(`First student: enrollment=${pdfAResults[0].enrollment}, roll=${pdfAResults[0].rollNumber}, sgpa=${pdfAResults[0].sgpa}`);
    console.log(`Last student: enrollment=${pdfAResults[pdfAResults.length-1].enrollment}, roll=${pdfAResults[pdfAResults.length-1].rollNumber}, sgpa=${pdfAResults[pdfAResults.length-1].sgpa}`);
  }

  console.log("\n--- PDF B Summary ---");
  console.log(`Count: ${pdfBResults.length}`);
  if (pdfBResults.length > 0) {
    console.log("First 3 students:");
    pdfBResults.slice(0, 3).forEach((s, idx) => {
      console.log(`  [${idx + 1}] enrollment=${s.enrollment}, roll=${s.rollNumber}, subjects=${s.subjects.length}, totalCredits=${s.totalCredits}, totalGP=${s.totalGradePoints}, sgpa=${s.sgpa}`);
    });

    console.log("Last 3 students:");
    pdfBResults.slice(-3).forEach((s, idx) => {
      console.log(`  [${pdfBResults.length - 3 + idx + 1}] enrollment=${s.enrollment}, roll=${s.rollNumber}, subjects=${s.subjects.length}, totalCredits=${s.totalCredits}, totalGP=${s.totalGradePoints}, sgpa=${s.sgpa}`);
    });

    const invalidSubjectCounts = pdfBResults.filter(s => s.subjects.length !== 7 && s.subjects.length !== 0);
    console.log(`Students with subject count != 7 (except withheld): ${invalidSubjectCounts.length}`);
  }

  return { pdfAResults, pdfBResults, baselineEqual, pdfBError };
}

runVerification().catch(console.error);
