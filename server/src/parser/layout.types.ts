import { PdfToken } from "./parser.types.js";

export interface BoundingBox {
  x: number;
  y: number;
  w: number;
  h?: number;
}

export interface LayoutColumnBand {
  id: string;
  minX: number;
  maxX: number;
  label?: string;
}

export interface LayoutRow {
  page: number;
  y: number;
  tokens: PdfToken[];
  cellsByColumn: Record<string, PdfToken[]>;
}

export interface PageLayout {
  pageNumber: number;
  headerTokens: PdfToken[];
  dataRows: LayoutRow[];
  footerTokens: PdfToken[];
}

export interface DocumentLayout {
  formatId: string;
  pageCount: number;
  pages: PageLayout[];
  columnBands: LayoutColumnBand[];
  totalDataRows: number;
}

export interface FormatProfile {
  id: string;
  name: string;
  detect: (tokens: PdfToken[]) => boolean;
}
