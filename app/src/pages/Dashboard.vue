<template>
    <div id="dashboard">
        <h1>Dashboard</h1>
        <div>
            <h2>Hello, {{userState.firstName}}</h2>

            <counter></counter>

            <router-link :to="{name: 'edit'}">Éditer mon profil</router-link>
        </div>
    </div>
</template>

<script>
    import Counter from '../elements/Counter.vue';
    import user from '../stores/UserStore'
    export default {
        components: {Counter},
        data () {
            return {
                userState: user.state
            };
        },
        mounted (){
            this.$http.get('/api/user/me', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                console.log('Success');
                response.json().then((message) => {
                    user.setUser(message.data);
                });
            }, (response) => {
                console.log('Error');
            });
        },
        methods: {}
    };
</script>

<style>
    @media screen and (min-width: 700px) {
        #dashboard {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }
</style>