// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  try {

      const vuetify = createVuetify({
        ssr: true,
      theme: {
        dark: false,
      },
      defaultAssets: {
        font: false,
        icons: 'mdiSvg'
      },
      treeShake: true
        // ... your configuration
      })
  app.vueApp.use(vuetify)
} catch (e) {
  // app.$rollbar.error(e)
  console.error(e)
}
})
