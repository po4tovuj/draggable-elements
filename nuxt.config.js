export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'draggable-elements',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/_settings.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/draggable', '~plugins/photos.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    '@nuxtjs/axios',
  ],
  styleResources: {
    // your settings here
    scss: '~assets/abstracts/_mixins.scss',
    hoistUseStatements: false, // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        prependData: "@import '~assets/abstracts/_mixins.scss",
      },
    },
  },
}
