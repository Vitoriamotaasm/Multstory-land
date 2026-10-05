import { createApp, nextTick } from 'vue'
import './styles/index.css'
import App from './App.vue'
import { runIntro } from './intro/intro'

createApp(App).mount('#app')

nextTick(runIntro)
