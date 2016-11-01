import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        component: require('./pages/Home.vue'),
        name: 'home'
    }, {
        path: '/help',
        component: require('./pages/Help.vue'),
        name: 'help'
    }, {
        path: '/login',
        component: require('./pages/Login.vue'),
        name: 'login'
    }, {
        path: '/register',
        component: require('./pages/Register.vue'),
        name: 'register'
    }, {
        path: '/edit',
        component: require('./pages/Register.vue'),
        name: 'edit'
    }, {
        path: '/challenges',
        component: require('./pages/Challenges.vue'),
        name: 'challenges'
    }, {
        path: '/mapping',
        component: require('./pages/Mapping.vue'),
        name: 'mapping'
    }, {
        path: '/organization',
        component: require('./pages/Organization.vue'),
        name: 'organization'
    }, {
        path: '/recovery',
        component: require('./pages/Recovery.vue'),
        name: 'recovery'
    }, {
        path: '/dashboard',
        component: require('./pages/Dashboard.vue'),
        name: 'dashboard'
    }, {
        path: '/logout',
        component: require('./pages/Logout.vue'),
        name: 'logout'
    }, {
        path: '*',
        component: require('./pages/Lost.vue'),
        name: 'lost'
    }]
});


new Vue({
    el: '#app',
    router: router,
    render: h => h(require('./App.vue'))
});
