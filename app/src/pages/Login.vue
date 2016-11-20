<template>
    <div id="login" class="page">
        <h1>Connexion</h1>
        <form v-on:submit.prevent="login">
            <div>
                <label for="login">Adresse e-mail :</label>
                <input type="email" id="email" v-model="user.email"/>
            </div>

            <div>
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" v-model="user.password"/>
            </div>

            <div class="actions">
                <router-link class="special" :to="{name: 'home'}">back();</router-link>
                <router-link class="special" :to="{name: 'recovery'}">lost(myAccount);</router-link>
                <input type="submit" class="special" value="submit(this);"/>
            </div>
        </form>
    </div>
</template>

<script>
    import user from '../stores/UserStore';
    export default {
        data () {
            return {
                user: {
                    email: "",
                    password: ""
                }
            };
        },
        mounted() {
            if (user.getToken()) {
                this.$http.get('/api/user/me', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                    response.json().then((message) => {
                        user.setUser(message.data);
                        this.$router.push({name: 'dashboard'});
                    });
                }, (response) => {
                    console.warn('Erreur Login.vue /api/user/me');
                });
            }
        },
        methods: {
            login() {
                this.$http.post('/api/login', JSON.stringify(this.user)).then((response) => {
                    response.json().then((message) => {
                        user.setToken(message.data.token);
                        this.$router.push({name: 'dashboard'});
                    });
                }, (error) => {
                    console.warn('Erreur Login.vue /api/login');
                    error.json().then((message) => {
                        alert(message.message);
                    });
                });
            }
        }
    };
</script>

<style>
    @media screen and (min-width: 700px) {
        #login {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }
</style>