/*
NOTES

Working on isEmailinDOM

Next steps:
- create mock DOM for test environment with jsdom
- get isEmailinDOM to return true

*/

export function isEmailInDOM() {
  return false;
}

export function init() {
  console.log("initializing chrome extension...");
  alert("Hello from your Chrome extension!");
}

// Commenting out because Jest will call this when requiring
// init();
