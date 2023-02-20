<p align="center">
    <img align="center" width="33%" src="assets/icon.png">
</p>
<p align="center">
    Husky is a productivity extension
</p>

## Feature

- Quick glance at Github PRs and Issues
- Omnibox shortcuts
- ... More to come

## Install

Release packages will be added later to the Release section but for now if you are interested you can build it yourself:

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

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!

## TODO

#### Shortcuts:

- [x] Show suggestions from history
- [ ] Make option definition better with automatic schema
- [ ] Support remote json files as config

#### Other:

- [ ] Add support for key shortcuts
