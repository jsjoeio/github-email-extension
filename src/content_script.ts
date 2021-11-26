/*
NOTES

Next steps:

*/

/**
 * Checks for the email in the DOM using querySelector.
 * @returns {boolean} true if in DOM, false if not.
 */
export function isEmailInDOM(_document: Document) {
  const EMAIL_CLASS = ".u-email";
  const emailElement = _document.querySelector(EMAIL_CLASS);
  return emailElement !== null;
}

export function init() {
  console.log("initializing chrome extension...");
  alert("Hello from your Chrome extension!");
}

// Commenting out because Jest will call this when requiring
// init();
