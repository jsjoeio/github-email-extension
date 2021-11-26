import jsdom from "jsdom";
import { isEmailInDOM } from "../content_script";

const { JSDOM } = jsdom;

describe("isEmailInDOM", () => {
  describe("without email in DOM", () => {
    let mockDocument: Document;

    beforeEach(() => {
      // initialize DOM with empty body
      mockDocument = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`).window
        .document;
    });
    it("should return false if it doesn't", () => {
      expect(isEmailInDOM(mockDocument)).toBe(false);
    });
  });
  describe("with the email in DOM", () => {
    let mockDocument: Document;

    beforeEach(() => {
      // initialize DOM with empty body
      mockDocument = new JSDOM(
        `<!DOCTYPE html><a class="u-email Link--primary " href="mailto:joe@gmail.com">joe@gmail.com</a>`
      ).window.document;
    });
    it("should return true if it does", () => {
      expect(isEmailInDOM(mockDocument)).toBe(true);
    });
  });
});
