export interface PdfToken {
  text: string;
  x: number;
  y: number;
  w: number;
  page: number;
  fontSize?: number;
  isBold?: boolean;
  isItalic?: boolean;
}

export interface Pdf2JsonTextRun {
  T: string;
  S?: number;
  TS?: number[];
}

export interface Pdf2JsonText {
  x: number;
  y: number;
  w?: number;
  sw?: number;
  A?: string;
  R: Pdf2JsonTextRun[];
}

export interface Pdf2JsonPage {
  Width: number;
  Height: number;
  Texts: Pdf2JsonText[];
}

export interface Pdf2JsonData {
  Pages: Pdf2JsonPage[];
}
