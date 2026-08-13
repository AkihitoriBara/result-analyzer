import { PdfToken } from "./parser.types.js";

export class TokenNormalizer {
  toWords(tokens: PdfToken[]): string[] {
    return tokens.map((token) => token.text);
  }
}
