<template>
    <div id="dashboard">
        <h1>Dashboard</h1>
        <div>
            <h2>Hello, {{userState.firstName}}</h2>
        </div>
    </div>
</template>

<script>
    import user from '../stores/UserStore'
    export default {
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