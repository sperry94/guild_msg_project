# Guild Engineering Application Project

Author: Seth Perry

## Feature List

- Log in with Google
- Add other users by email
- Send messages in multiple conversations

## Limitations

- Would have liked to do more E2E testing in cypress
- Need to approach the security of user info in a different way
  - Would need to find a better approach to ensuring that users can see the info for users they start conversations with, but can't query the DB for all user info
  - Need to stop users add tons of conversations to effectively get user info, maybe a conversation "accept" pattern that prevents data from being shared with malicious actors
- Would have liked to add notifications
- Would have liked to add online/offline status
- Only one-on-one conversations are possible
  - This would be a simple feature addition due to some abstractions I made
- Would have liked to test the cloud functions/database rules more thoroughly
- Would have liked to have an infinite scroll (or other similar function) to prevent loading all messages for a conversation

## Front-End Technical Decisions

### React

I have the most knowledge in this framework and find it extremely capable with the inclusion of hooks.

### Typescript

Prevents a lot of potential bugs and gives better auto-complete support in VSCode.

### Gatsby

I chose to use Gatsby over a Create React App (CRA) Application for this project because it's static-site rendering capability offers the benefits listed below. It's important to point out that a Gatsby app is still a React app, just delivered in a different way.

1. Faster first-meaningful-paint times.
   - Gatsby builds an HTML file based on your React App (the React App gets rebuilt on the client once the JS runs). Thus, the second the HTML file is loaded, the browser can display your content.
2. Better Search-Engine Optimization (SEO).
   - Because Gatsby outputs actual HTML files, webcrawlers can more easily map/rank your site.
3. Same/better user-experience.
   - Gatsby will [rehydrate the React app once it loads](https://www.gatsbyjs.org/docs/react-hydration/).
   - Gatsby implements pre-fetching for links, meaning that the app will behave essentially the same as a strictly JS-based router.
4. Easier path to a Progressive Web App (PWA)
   - There is a simple gatsby plugin that will convert the app into a PWA
5. A variety of other small benefits.
   - Interesting static image-optimizations

**Note:** I was approaching this project with the understanding that the application should be basically a standalone app that SEO would be a concern for. If that weren't the case, I'd likely have just gone with CRA.

### Jest/Enzyme

These are industry standards for unit-testing a React app.

### Cypress

I've got a fair amount of experience with Cypress. I've found it to be much more reliable and usable than Selenium.

## Back-End Technical Decisions

### Firebase

I chose the Firebase platform because I have some experience with it and it provided all the following features at a free tier:

1. Serverless Fucntions
2. Document Database
3. 3rd-Party authentication tools

## Running Locally

1. Install the Gatsby CLI with the following command: `npm install -g gatsby-cli`.
2. Make sure that the gatsby CLI is in your PATH by running `gatsby -v`. If it fails, troubleshoot the CLI install.
3. Download the Git Repo and unpackage it.
4. Run `npm install` or `yarn install`.
5. Run `npm run serve` or `yarn develop`.
6. Open a browser to `https://localhost:8000`
