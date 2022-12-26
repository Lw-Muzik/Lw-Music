import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './index.css';
// import { SliderPlugin } from "@syncfusion/ej2-vue-inputs";
import "material-icons/css/material-icons.min.css";
createApp(App).use(store).use(router)/*.use(SliderPlugin)*/.mount('#app');