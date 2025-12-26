import  { presetWind4, defineConfig, presetIcons } from 'unocss'
import { presetScrollbarHide } from 'unocss-preset-scrollbar-hide'

export default defineConfig({
  presets: [
    presetWind4({
      dark: 'media',
    }),
    presetIcons(),
    presetScrollbarHide(),
  ],
  theme: {
    colors: {
      primary: 'var(--md-sys-color-primary)',
      'primary-fixed': 'var(--md-sys-color-primary-fixed)',
      'primary-fixed-dim': 'var(--md-sys-color-primary-fixed-dim)',
      'on-primary': 'var(--md-sys-color-on-primary)',
      secondary: 'var(--md-sys-color-secondary)',
      'secondary-fixed': 'var(--md-sys-color-secondary-fixed)',
      'secondary-fixed-dim': 'var(--md-sys-color-secondary-fixed-dim)',
      'on-secondary': 'var(--md-sys-color-on-secondary)',
      tertiary: 'var(--md-sys-color-tertiary)',
      'tertiary-fixed': 'var(--md-sys-color-tertiary-fixed)',
      'tertiary-fixed-dim': 'var(--md-sys-color-tertiary-fixed-dim)',
      'on-tertiary': 'var(--md-sys-color-on-tertiary)',
      background: 'var(--md-sys-color-background)',
      'on-background': 'var(--md-sys-color-on-background)',
      surface: 'var(--md-sys-color-surface)',
      'surface-variant': 'var(--md-sys-color-surface-variant)',
      'surface-container': 'var(--md-sys-color-surface-container)',
      'on-surface': 'var(--md-sys-color-on-surface)',
      'on-surface-variant': 'var(--md-sys-color-on-surface-variant)',
      outline: 'var(--md-sys-color-outline)',
      'on-outline': 'var(--md-sys-color-on-outline)',
      error: 'var(--md-sys-color-error)',
      'on-error': 'var(--md-sys-color-on-error)',
      'error-container': 'var(--md-sys-color-error-container)'
    },
    zIndex: {
      base: '0',
      floating: '10',
      overlay: '100',
      modal: '1000',
      toast: '1500',
      nav: '1800',
      system: '2000',
    },
  },
  safelist: [
    'i-material-symbols-thumb-up-outline',
    'i-material-symbols-thumb-up',
    'i-material-symbols-reply',
    'i-material-symbols-reply',
    'i-material-symbols-thumb-down-outline',
    'i-material-symbols-thumb-down',
    'i-material-symbols-share',
    'i-material-symbols-share',
    'border-l-2',
    'border',
  ],
  rules: [
    ['no-scrollbar', { 'scrollbar-width': 'none' }]
  ],
  shortcuts: {
    // 文字样式
    'big-title': 'text-2xl font-bold my-4',
    'sma my-2ll-title': 'text-xl font-bold',
    // 容器样式
    'center-container': 'flex justify-center items-center',
    // 按钮样式
    'glass-button': 'border-white hover:bg-white/30 active:bg-white/40 text-shadow-sm text-shadow-white dark:text-shadow-black backdrop-blur-2 rounded-md p-1 transition-colors cursor-pointer',
    'button-lg': 'text-lg border-2 rounded-md p-1',
    'btn': 'px-4 py-2 rounded-full font-medium transition-colors',
    'btn-primary': 'btn bg-primary text-on-primary hover:bg-[color-mix(in_srgb,_var(--md-sys-color-primary)_90%,_white)]',
    'btn-secondary': 'btn bg-secondary text-on-secondary hover:bg-[color-mix(in_srgb,_var(--md-sys-color-secondary)_90%,_white)]',
    'btn-tertiary': 'btn bg-tertiary text-on-tertiary hover:bg-[color-mix(in_srgb,_var(--md-sys-color-tertiary)_90%,_white)]',
  }
})
