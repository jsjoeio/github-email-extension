import jsdom from "jsdom";
import {
  isEmailInDOM,
  getGitHubUsernameFromURL,
  fetchGitHubUserEventData,
  getEmailFromGitHubEventData,
} from "../content_script";

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

describe("getGitHubUsernameFromURL", () => {
  let mockLocation: Location;

  beforeEach(() => {
    // initialize DOM with empty body
    mockLocation = new JSDOM(
      `<!DOCTYPE html><a class="u-email Link--primary " href="mailto:joe@gmail.com">joe@gmail.com</a>`,
      {
        url: "https://github.com/jsjoeio",
      }
    ).window.location;
  });
  it("should parse the GitHub username and return it", () => {
    const username = getGitHubUsernameFromURL(mockLocation);
    const expected = "jsjoeio";
    expect(username).toBe(expected);
  });
});

describe("fetchGitHubUserEventData", () => {
  it("should return data", async () => {
    // implement
    const username = "jsjoeio";
    const data = await fetchGitHubUserEventData(username);
    expect(data).not.toBeNull();
  });
});

describe("getEmailFromGitHubEventData", () => {
  it("should return null if no data", () => {
    const fakeData: any[] = [];
    const email = getEmailFromGitHubEventData(fakeData);
    const expected = null;
    expect(email).toBe(expected);
  });
  it("should return the email if it exists", () => {
    // const fakeData: Awaited<ReturnType<typeof fetchGitHubUserEventData>> = [
    const fakeData: any[]= [
      {
        id: "19068279411",
        type: "PushEvent",
        actor: {
          id: 3806031,
          login: "jsjoeio",
          display_login: "jsjoeio",
          gravatar_id: "",
          url: "https://api.github.com/users/jsjoeio",
          avatar_url: "https://avatars.githubusercontent.com/u/3806031?",
        },
        repo: {
          id: 431949686,
          name: "jsjoeio/github-email-extension",
          url: "https://api.github.com/repos/jsjoeio/github-email-extension",
        },
        payload: {
          push_id: 8480559582,
          size: 2,
          distinct_size: 2,
          ref: "refs/heads/master",
          head: "2ae3fbb9a32d73842b180bfde3ee940bb2a16f2e",
          before: "562e3aac529aba67a449f36521c6cb836060e179",
          commits: [
            {
              sha: "a5eaa154e8392f401636b862adb721437dd53274",
              author: {
                email: "joe@gmail.com",
                name: "Joe",
              },
              message: "feat: add isEmailinDOM",
              distinct: true,
              url: "https://api.github.com/repos/jsjoeio/github-email-extension/commits/a5eaa154e8392f401636b862adb721437dd53274",
            },
            {
              sha: "2ae3fbb9a32d73842b180bfde3ee940bb2a16f2e",
              author: {
                email: "joe@gmail.com",
                name: "Joe",
              },
              message: "feat: add getGitHubUsernameFromURL",
              distinct: true,
              url: "https://api.github.com/repos/jsjoeio/github-email-extension/commits/2ae3fbb9a32d73842b180bfde3ee940bb2a16f2e",
            },
          ],
        },
        public: true,
        created_at: "2021-11-26T16:50:02Z",
      },
    ];
    const email = getEmailFromGitHubEventData(fakeData);
    const expected = "joe@gmail.com";
    expect(email).toBe(expected);
  });
});
