## Features

- Dev-server to aid development by automatically refreshing the browser whenever an edit is made to any of the source files.
- Build script that:
  - Converts all ES6 to browser friendly ES5.
  - Converts SASS to CSS and adds vendor prefixes to CSS rules.
  - Minifies, concatenates, and bundles all JavaScript and CSS files.
  - Compresses images.

# Installation

```
npm install
```

# Usage

## Development

Sample files are included in `source`. These files are meant to be replaced. The only constraint is that there must be a `source/index.js` file. Place all other files inside `source` (nested sub-directories allowed).

`npm run start` to start the dev-server and view site at: `http://localhost:8080`. As files are edited in `source` the browser will update.

## Build

`npm run build` to create a production build of the site in `build` directory at project root. This is a static build so it can be opened directly in a browser.

# Author

Krzysztof Wyrzykowski ([kryz.me](http://kryz.me))
