# Adding access token to custom hooks built using react query

This repo provides an example of setting up a generic suspensible (and regular) react query that embeds token acquisition into hook fetcher. Follow the emojis like these ones to find out key aspects of this example:

- 🚨 Important Notes
- 💡 Tips or Suggestions
- 🛠️ Implementation Details
- ❓ Questions or Uncertainties

## Dummy Data

We're using [jsonplaceholder](https://jsonplaceholder.typicode.com/) api is used to render some dynamic dummy data in UI.

## Testing

Follow through the configurations and comments in the repo to learn more about setting up [vitest](https://vitest.dev/) with [mock service worker](https://mswjs.io/) and testing custom hooks like `use-posts.ts`, built on top of our generic auth query hooks.

## Getting Started

Repo relies on [pnpm](https://pnpm.io/) as it's package manager. You should however be able to run it with npm or yarn with relative ease.

Handy commands to get started:

- Start off by running `pnpm install` (or use [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) or <your favourite package manager>)
- `pnpm dev` to start the app in development mode
- `pnpm test` to test the app

Start from `App.tsx` and drill down into the component tree, hooks and tests as you see fit.
