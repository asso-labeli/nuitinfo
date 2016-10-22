import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        component: require('./components/Home.vue'),
        name: 'home'
    }, {
        path: '/help',
        component: require('./components/Help.vue'),
        name: 'help'
    }, {
        path: '/login',
        component: require('./components/Login.vue'),
        name: 'login'
    }, {
        path: '*',
        component: require('./components/Lost.vue'),
        name: 'lost'
    }]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(require('./App.vue'))
});
