import { createApp } from 'vue'
import App from './App.vue'
import VizElement from 'viz-ui-y'
import 'viz-ui-y/dist/index.css'

const app = createApp(App)
app.use(VizElement)

app.mount('#app')
