import { Octokit } from "@octokit/rest";
/*
NOTES

Next steps:
- getEmailFromGitHubEventData

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

/**
 * Returns the GitHub username from the URL
 */
export function getGitHubUsernameFromURL(_location: Location) {
  return _location.href.split("/")[3];
}

/**
 * Returns GitHub user event data using a username
 */
export async function fetchGitHubUserEventData(username: string) {
  const octokit = new Octokit();
  const { data } = await octokit.rest.activity.listPublicEventsForUser({
    username,
    per_page: 10,
  });

  return data;
}

/**
 * Returns the email after parsing the GitHubUserEventData
 */
export function getEmailFromGitHubEventData(
  data: Awaited<ReturnType<typeof fetchGitHubUserEventData>>
) {
  let email: string | null = null;
  // Issue with types: https://github.com/octokit/rest.js/issues/128
  data.map((eventData) => {
    if (eventData.type === "PushEvent") {
      // @ts-expect-error
      const commits: any[] = eventData.payload.commits;
      commits.map((commit) => {
        email = commit.author.email;
      });
    }
  });

  return email;
}

export function init() {
  console.log("initializing chrome extension...");
  alert("Hello from your Chrome extension!");
}

// Commenting out because Jest will call this when requiring
// init();
