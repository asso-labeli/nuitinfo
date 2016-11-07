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
    import user from '../stores/UserStore';
    export default {
        data () {
            return {
                email: ""
            };
        },
        methods: {
            recover() {
                console.log(JSON.stringify(this.email));
                console.log(user.state);
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