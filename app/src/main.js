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
        path: '/register',
        component: require('./components/Register.vue'),
        name: 'register'
    }, {
        path: '/challenges',
        component: require('./components/Challenges.vue'),
        name: 'challenges'
    }, {
        path: '/mapping',
        component: require('./components/Mapping.vue'),
        name: 'mapping'
    }, {
        path: '/sponsorship',
        component: require('./components/Sponsorship.vue'),
        name: 'sponsorship'
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
