<template>
    <div id="recovery" class="page">
        <h1>Récupération</h1>
        <form v-on:submit.prevent="recover">
            <div>
                <label for="email">Adresse e-mail :</label>
                <input type="email" id="email" v-model="email"/>
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
                email: ""
            };
        },
        methods: {
            recover() {
                this.$http.post('/api/passwordRecovery', JSON.stringify({email: this.email})).then((response) => {
                    if (response.status === 200) {
                        response.json().then((message) => {
                            alert('Un email vous a été envoyé.');
                        });
                    }
                }, (error) => {
                    console.warn('Erreur Recovery.vue /api/passwordRecovery');
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
        #recovery {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }
</style>