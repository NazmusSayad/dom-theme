type Config = ReturnType<typeof getDefaultConfig>
const getDefaultConfig = () => ({
  root: document.querySelector(`:root`)!,
  init: 'auto' as 'auto' | 'light' | 'dark',
  modeAtt: 'theme-mode',
  themeAtt: 'theme',
  storeKey: 'app-theme',
  watch: true,
})

class DomTheme {
  #conf = getDefaultConfig()
  #watchRef: MediaQueryList | null = null

  constructor(config?: Partial<Config>) {
    config && Object.assign(this.#conf, config)
  }

  run() {
    const storedTheme =
      localStorage.getItem(this.#conf.storeKey) ?? this.#conf.init

    if (storedTheme === 'dark') return this.dark()
    if (storedTheme === 'light') return this.light()
    return this.auto()
  }

  get mode(): 'auto' | 'light' | 'dark' {
    return this.#conf.root.getAttribute(this.#conf.modeAtt) as any
  }

  get theme(): 'light' | 'dark' {
    return this.#conf.root.getAttribute(this.#conf.themeAtt) as any
  }

  get isAutoMode() {
    return this.mode === 'auto'
  }

  get isLightMode() {
    return this.mode === 'light'
  }

  get isDarkMode() {
    return this.mode === 'dark'
  }

  get isLight() {
    return this.theme === 'light'
  }

  get isDark() {
    return this.theme === 'dark'
  }

  toggle(auto = false): 'auto' | 'light' | 'dark' {
    const current = auto ? this.mode : this.theme

    if (current === 'auto') return this.light()
    if (current === 'light') return this.dark()
    return auto ? this.auto() : this.light()
  }

  auto(): 'auto' {
    const media = matchMedia('(prefers-color-scheme: dark)')
    this.#conf.watch && this.#watch()
    this.#setAttr(media.matches ? 'dark' : 'light', true)
    return 'auto'
  }

  light(): 'light' {
    this.#stopWatch()
    this.#setAttr('light')
    return 'light'
  }

  dark(): 'dark' {
    this.#stopWatch()
    this.#setAttr('dark')
    return 'dark'
  }

  #setAttr(theme: 'light' | 'dark', isAuto = false) {
    const mode = isAuto ? 'auto' : theme
    localStorage.setItem(this.#conf.storeKey, mode)

    this.#conf.root.setAttribute(this.#conf.modeAtt, mode)
    this.#conf.root.setAttribute(this.#conf.themeAtt, theme)
  }

  #watch() {
    const media = matchMedia('(prefers-color-scheme: dark)')
    media.onchange = () => this.auto()
    this.#watchRef = media
  }

  #stopWatch() {
    if (!this.#watchRef) return
    this.#watchRef.onchange = null
    this.#watchRef = null
  }
}

export default DomTheme
