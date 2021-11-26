import { Octokit } from "@octokit/rest";
/*
NOTES

Next steps:
- refactor buildEmailElement
- add Copy to clipboard into DOM

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
  const pushEvents = data.filter((eventData) => eventData.type === "PushEvent");

  loopThroughPushEvents: for (let i = 0; i < pushEvents.length; i++) {
    const event = pushEvents[i];
    // @ts-expect-error
    const commits = event.payload.commits;
    loopThroughCommitsInPushEvent: for (let j = 0; j < commits.length; j++) {
      const foundEmail = commits[i].author.email;
      if (foundEmail) {
        email = foundEmail;
        break loopThroughPushEvents;
      }
    }
  }

  return email;
}

/**
 * Adds Node to DOM with email
 */
export function insertEmailIntoDOM(_document: Document, email: string) {
  // implement
  const V_CARD_CLASS = ".vcard-details";
  const vCardElement = _document.querySelector(V_CARD_CLASS);

  const emailElement = buildEmailElement(email);

  vCardElement?.insertAdjacentHTML("beforeend", emailElement);
}
export const buildEmailElement = (
  email: string
) => `<li itemprop="email" aria-label="Email: ${email}" class="vcard-detail pt-1 css-truncate css-truncate-target "><svg class="octicon octicon-mail" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"></path></svg>
  <a class="u-email Link--primary " href="mailto:${email}">${email}</a>
</li>`;

export function init() {
  console.log("initializing chrome extension...");
  alert("Hello from your Chrome extension!");
}

// Commenting out because Jest will call this when requiring
// init();
