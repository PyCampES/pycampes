import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import store from './store'

const app = createApp(App)

app.use(Quasar, quasarUserOptions)
app.use(store)
app.mount('#app')


// createApp(App).use(Quasar, quasarUserOptions).mount('#app')
