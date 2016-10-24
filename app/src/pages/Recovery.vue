<template>
    <div id="recovery">
        <h1>Récupération</h1>
        <form v-on:submit.prevent="recovery">
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
            login() {
                console.log(JSON.stringify(this.email));
                /*
                this.$http.post('/api/user/recovery', JSON.stringify(this.email)).then((response) => {
                    console.log('Success');
                }, (response) => {
                    console.log('Error');
                });
                */
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