import type { HeadConfig } from 'vitepress'
import {useMediaQuery} from "../cache/deps/vitepress___@vueuse_core";


export const head: HeadConfig[] = [
  ['meta', { name: 'theme-color', content: 'rgba(0, 0, 0, 0)' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['link', { rel: 'icon', href: '/site-logo-light.png' }],
  ['link', { rel: 'apple-touch-icon', href: '/site-logo-light.png' }],
  ['link', { rel: 'mask-icon', href: '/site-logo-light.png', color: 'rgba(0, 0, 0, 0)' }],
  ['meta', { name: 'msapplication-TileImage', content: '/site-logo-light.png' }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
]


/*
export const head: HeadConfig[] = [
  ['meta', { name: 'theme-color', content: '#FFFFFF' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['link', { rel: 'icon', href: '/favicon.png' }],
  ['link', { rel: 'apple-touch-icon', href: '/favicon.ico' }],
  ['link', { rel: 'mask-icon', href: '/favicon.ico', color: '#FFFFFF' }],
  ['meta', { name: 'msapplication-TileImage', content: '/favicon.ico' }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
]*/
