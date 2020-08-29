<p align="center"><img src="https://pbs.twimg.com/profile_images/1286204702338813952/X8fdf5p-_400x400.png" width="140"/></p>

<p align="center">
  <a href="https://prettier.io">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="Styled with Prettier">
  </a>
  <a href="http://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen Friendly">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-008033.svg" alt="License: MIT">
  </a>
</p>

---

## yearn.finance Vaults Safe App

The yearn.finance Vaults Safe App allows [Gnosis Safes](https://gnosis-safe.io/) to interact with [yearn.finance](https://yearn.finance/vaults) vaults.

Read more about Safe Apps [here](https://docs.gnosis.io/safe/docs/sdks_safe_apps/).

## Contributing :raising_hand_woman:

If you are interested in contributing or have any questions, ping me on [Twitter](https://twitter.com/tomfrench_eth).

### Getting set up

To start developing on the Yearn Finance Safe app, first clone this repository and enter the new directory.

```bash
git clone https://github.com/TomAFrench/yearn-safe-app.git
cd yearn-safe-app
```

Before getting started you will need to create a `.env` file. We have provided `.env.example` as a template.

```bash
cp .env.example .env
```

Finally install any dependencies and start the dev server

```bash
yarn install
yarn start
```

The app will then be hosted on `http://localhost:3002`. By default the app will expect an injected web3 provider such as metamask; if you want to interact with the app through the Gnosis UI you'll need to set the `REACT_APP_LOCAL_WEB3_PROVIDER` environment variable to `false`.

### react-app-rewired

In order to allow the Gnosis Safe UI to access the app while it's running on localhost we need to edit the headers on the dev server (`node_modules/react-scripts/config/webpackDevServer.config.js`) to avoid CORS issues:

```
headers: {
    "Access-Control-Allow-Origin": "\*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
},
```

We automate injecting these headers in to the server config through [react-app-rewired](https://github.com/timarney/react-app-rewired).
