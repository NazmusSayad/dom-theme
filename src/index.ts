interface Config {
  root: HTMLElement
  rootAtt: string
  rootAutoAtt: string
  dataKey: string
}

class DomTheme {
  #conf = {
    root: document.querySelector(`:root`),
    rootAtt: 'theme',
    rootAutoAtt: 'theme-auto',
    dataKey: 'app-theme',
  }

  constructor(config: Config) {
    if (config) {
      Object.assign(this.#conf, config)
    }
  }

  #store(theme: null | 'dark' | 'light' = null) {
    if (theme) {
      // @ts-ignore
      this.#conf.root.removeAttribute(this.#conf.rootAutoAtt)
      return localStorage.setItem(this.#conf.dataKey, theme)
    }

    // @ts-ignore
    this.#conf.root.setAttribute(this.#conf.rootAutoAtt, '')
    localStorage.removeItem(this.#conf.dataKey)
  }

  #watch() {
    const media = matchMedia('(prefers-color-scheme: dark)')
    media.onchange = () => {
      if (this.isAuto) this.auto()
    }
  }

  run(watch = true) {
    const storedTheme = localStorage.getItem(this.#conf.dataKey)
    if (storedTheme === 'dark') {
      this.dark()
    } else if (storedTheme === 'light') {
      this.light()
    } else {
      this.auto()
    }

    watch && this.#watch()
  }

  get isAuto() {
    // @ts-ignore
    return Boolean(this.#conf.root.getAttribute(this.#conf.rootAutoAtt))
  }

  get current() {
    // @ts-ignore
    return this.#conf.root.getAttribute(this.#conf.rootAtt)
  }

  toggle() {
    const current = this.current

    if (current === 'dark') {
      this.light()
    } else if (current === 'light') {
      this.dark()
    } else {
      this.auto()
    }
  }

  auto() {
    const media = matchMedia('(prefers-color-scheme: dark)')
    this.#setAttr(media.matches ? 'dark' : 'light')
    this.#store()
  }

  light() {
    this.#setAttr('light')
    this.#store('light')
  }

  dark() {
    this.#setAttr('dark')
    this.#store('dark')
  }

  #setAttr(theme: 'light' | 'dark') {
    // @ts-ignore
    this.#conf.root.setAttribute(this.#conf.rootAtt, theme)
  }
}

export default DomTheme
