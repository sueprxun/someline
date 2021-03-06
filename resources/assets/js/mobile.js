/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('vue');
import Vuex from 'vuex';
Vue.use(Vuex);
// Vue Directives
Vue.directive('focus', require('./directives/focus'));

// Vue Filters
Vue.filter('nl2br', require('./filters/nl2br'));

// Vue Mixins
import MixInUser from './mixins/user'
import MixInJQuery from './mixins/jquery'
import MixInTools from './mixins/tools'
import MixInBus from './mixins/bus'
import MixInStore from './mixins/store'
import MixInMobileApp from './mixins/mobile_app'
Vue.mixin(MixInUser);
Vue.mixin(MixInJQuery);
Vue.mixin(MixInTools);
Vue.mixin(MixInBus);
Vue.mixin(MixInStore);
Vue.mixin(MixInMobileApp);

// Vue Components
Vue.component('autosize-textarea', require('./essentials/autosize-textarea.vue'));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('sl-app-header', require('./components/mobile/main/section/AppHeader.vue'));
Vue.component('sl-app-tab-bar', require('./components/mobile/main/section/AppTabBar.vue'));

Vue.component('example', require('./components/Example.vue'));
Vue.component('sl-app-home', require('./components/mobile/home/Home.vue'));

// Vue Router
import RouterConfig from './mobile_router'
const router = new VueRouter(RouterConfig);

// Bus
const bus = new Vue({
    data: {
        title: "Someline",
    }
});
window.bus = bus;

// Vuex
const vuexStore = new Vuex.Store({
    state: {
        platform: 'mobile',
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
});
window.vuexStore = vuexStore;

const app = new Vue({
    router,
    el: '#app',
    data: {
        msg: "hello",
    },
    computed: {},
    watch: {},
    events: {},
    created(){
        console.log('Bootstrap.');
        this.initLocale();
    },
    mounted(){
        console.log('Ready.');
        this.eventEmit('AppReady');
    },
    methods: {
        initLocale(){
            console.log('Init Locale.');

            var that = this;
            var lang = this.locale;

            Vue.config.lang = lang;
            Vue.locale(lang, window.Someline.locales);

        },
    }
});
