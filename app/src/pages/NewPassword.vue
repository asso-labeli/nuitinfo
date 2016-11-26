<template>
    <div id="newPassword" class="page">
        <h1>Changement de mot de passe</h1>
        <form v-on:submit.prevent="changePassword">
            <div>
                <label for="password">Nouveau mot de passe:</label>
                <input type="password" id="password" v-model="password"/>
            </div>
            <div>
                <label for="checkPassword">Vérification :</label>
                <input type="password" id="checkPassword" v-model="checkPassword"/>
            </div>

            <div class="actions">
                <router-link class="special" :to="{name: 'home'}">back();</router-link>
                <input type="submit" class="special" value="submit(this);"/>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                password: "",
                checkPassword: ""
            };
        },
        methods: {
            changePassword() {
                if (this.password === this.checkPassword) {
                    if (this.$route.params.hasOwnProperty('token')) {
                        let token = this.$route.params.token;
                        this.$http.post('/api/recovery/' + token, JSON.stringify({password: this.password})).then((response) => {
                            response.json().then((message) => {
                                alert('Votre mot de passe a été modifié.');
                            });
                        }, (error) => {
                            console.warn('Erreur NewPassword.vue /api/recovery');
                            error.json().then((message) => {
                                alert(message.message);
                            });
                        });
                    } else {
                        alert('Token manquant');
                    }
                } else {
                    alert('Les mots de passe ne sont pas identiques');
                }
            }
        }
    }
</script>

<style>
    @media screen and (min-width: 700px) {
        #newPassword {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }
</style>