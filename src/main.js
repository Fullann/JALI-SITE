import Vue from 'vue';
import App from './App.vue';

import store from './store';
import router from './router';

import i18n from './i18n';
import './registerServiceWorker';

import Toast from 'vue-toast-notification';

import '@/assets/css/tailwind.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(Toast);
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {

    // use the language from the routing param or default language
    let language = to.params.lang;
    if (!language) {
        language = 'en'
    }

    // set the current language for i18n.
    i18n.locale = language
    next()
})


new Vue({
    router,
    i18n,
    store,
    render: h => h(App),
}).$mount('#app');