import { Pdf2JsonData, PdfToken } from "./parser.types.js";

export class PdfTokenExtractor {
  extract(pdfData: Pdf2JsonData): PdfToken[] {
    const tokens: PdfToken[] = [];

    if (!pdfData || !Array.isArray(pdfData.Pages)) {
      return tokens;
    }

    for (let pageIdx = 0; pageIdx < pdfData.Pages.length; pageIdx++) {
      const page = pdfData.Pages[pageIdx];
      const pageNumber = pageIdx + 1;

      if (!Array.isArray(page.Texts)) {
        continue;
      }

      for (const textItem of page.Texts) {
        if (!Array.isArray(textItem.R)) {
          continue;
        }

        for (const run of textItem.R) {
          let text: string;
          try {
            text = decodeURIComponent(run.T);
          } catch {
            text = run.T;
          }

          const token: PdfToken = {
            text,
            x: textItem.x,
            y: textItem.y,
            w: textItem.w ?? 0,
            page: pageNumber,
          };

          if (Array.isArray(run.TS)) {
            if (typeof run.TS[1] === "number") {
              token.fontSize = run.TS[1];
            }
            if (typeof run.TS[2] === "number") {
              token.isBold = run.TS[2] === 1;
            }
            if (typeof run.TS[3] === "number") {
              token.isItalic = run.TS[3] === 1;
            }
          }

          tokens.push(token);
        }
      }
    }

    return tokens;
  }
}
