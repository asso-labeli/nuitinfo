<template>
    <div id="login">
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
    export default {
        data () {
            return {
                user: {
                    email: "",
                    password: ""
                }
            };
        },
        methods: {
            login() {
                console.log(JSON.stringify(this.user));

                this.$http.post('/api/login', JSON.stringify(this.user)).then((response) => {
                    this.$route.router.go({name: 'home'});
                }, (response) => {
                    console.log('Error');
                    console.log(response);
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