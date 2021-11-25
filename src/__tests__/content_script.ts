/**
 * @jest-environment jsdom
 */
import { isEmailInDOM } from "../content_script";

window.alert = jest.fn();

describe("isEmailInDOM", () => {
  it("should return false if it doesn't", () => {
    expect(isEmailInDOM()).toBe(false);
  });
  it("should return true if it does", () => {
    // TODO@jsjoeio pass in document and mock
    expect(isEmailInDOM()).toBe(true);
  });
});
