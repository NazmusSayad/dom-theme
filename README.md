# dom-theme

Basic theme management tool for any kind of app

<a href="https://npmjs.com/package/dom-theme">
  <img src="https://img.shields.io/npm/v/dom-theme" alt="npm package"> 
</a>

---

## Example:

`/* app.js */`

```js
import DOMTheme from 'dom-theme'

const theme = new DOMTheme()
theme.run()
```

## Installation

- with npm

```shell
npm i dom-theme
```

- with yarn

```shell
yarn add dom-theme
```

- with pnpm

```shell
pnpm add dom-theme
```

<br/> <br/>

## Advanced Usages:

```js
import DOMTheme from 'dom-theme'

const options = {
  root: document.querySelector(`:root`), // Element where should add attr
  init: 'auto' | 'light' | 'dark', // Start this theme if any theme is not stored
  modeAtt: 'theme-mode', // where to write the theme mode
  themeAtt: 'theme', // where to write the theme
  storeKey: 'app-theme', // Localstorage key for saving theme mode
  watch: true, // If should watch for system theme changes in auto theme mode
}
const theme = new DOMTheme(options)
theme.run() // start theme

theme.mode // get current mode: 'auto' | 'light' | 'dark'
theme.isAutoMode // theme.mode === 'auto'
theme.isLightMode // theme.mode === 'light'
theme.isDarkMode // theme.mode === 'dark'

theme.theme // get current theme: 'light' | 'dark'
theme.isLight // theme.theme === 'light'
theme.isDark // theme.theme === 'dark'

theme.auto() // Set theme to auto
theme.light() // Set theme to light
theme.dark() // Set theme to dark
theme.toggle() // Toggle theme
theme.toggle(true) // Toggle theme but after dark theme start auto theme
```

Made by [Nazmus Sayad](https://github.com/NazmusSayad) with ❤️.
