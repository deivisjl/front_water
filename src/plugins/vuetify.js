import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        themes:{
            light:{
                background: colors.grey.lighten2,
            },
            dark:{
                background: colors.shades.white
            }
        },
        primary: '#1565c0',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  },
  icons: {
    iconfont: 'md'
  }
})
