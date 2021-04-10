// @ts-ignore
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Icon from '@/components/Icon.vue';
// @ts-ignore
import VueHighlightJS from 'vue-highlightjs';
import 'highlight.js/styles/darcula.css';
Vue.use(VueHighlightJS);
Vue.config.productionTip = false;
Vue.component('Icon', Icon);
new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
//# sourceMappingURL=main.js.map