<p align="center">
    <img align="center" width="33%" src="assets/icon.png">
</p>
<p align="center">
    Husky is a productivity extension
</p>

## Feature

- Quick glance at Github PRs and Issues
- Omnibox shortcuts (e.g. `hs <your keyword>` takes you to whatever address you have configured)
- ... More to come

_**Husky respects your privacy and does not collect any data.**_

It needs two permissions:

- Storage
  - Store settings locally
    - Github token
    - Configured shortcuts
- History
  - Show you suggestions from links you have visited
    - this will be made optional to make the extension more privacy friendly

## Install (With an option to build)

You can either download a prebuilt release from [here](https://github.com/kamyar/husky/releases/latest) or can build it yourself with:

```
git clone git@github.com:kamyar/husky.git
cd husky
yarn install
yarn build
```

And then inside Chrome go to extensions page and click "Load Unpacked" and select `build/chrome-mv3-prod`.

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

## TODO

- [x] Show suggestions from history
- [ ] Support remote json files as shortcut config
  - Make it possible to load either personal or company shortcuts easily
- [ ] Add support for keyboard shortcuts
- [ ] Improve styling (AKA Stop procrastinating and write those CSS 🎨)
- [ ] Add demo of the app
- Create an issue if you have a suggestion.
