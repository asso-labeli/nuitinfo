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
        path: '*',
        component: require('./pages/Lost.vue'),
        name: 'lost'
    }]
});


new Vue({
    el: '#app',
    router: router,
    cookies: {
        get: function (key) {
            let name = key + "=";
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        set: function (key, value) {
            let expires = Date.now();
            expires.setTime(expires.getTime() + (60 * 24 * 60 * 60 * 1000));
            document.cookie = key + '=' + value + '; expires=' + expires.toUTCString() + ";path=/";
        }
    },
    render: h => h(require('./App.vue'))
});
