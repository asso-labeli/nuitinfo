<template>
    <div id="sponsorship">
        <h1>Organisation</h1>
        <h2>Envie de devenir partenaire de l'événement bordelais ?</h2>
        <p>Vous trouverez notre plaquette d'information pour nos partenaires privés à <a href="">cette adresse</a></p>
        <div v-for="sponsor in sponsors">
            <h2 class="title">{{ sponsor.type }}</h2>
            <div v-for="partner in sponsor.partners">
                <a v-bind:href="partner.website" target="_blank">
                    <img v-bind:src="partner.logo"
                         v-bind:alt="'Logo de ' + partner.name"/>{{ partner.name }}</a>
                <div>{{ partner.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import dataStore from '../stores/DataStore';
    export default {
        data () {
            return {
                sponsors: dataStore.get('organization.sponsors', [])
            };
        },
        mounted () {
            this.$http.get('/src/data/sponsors/sponsors.json').then((response) => {
                response.json().then((data) => {
                    this.sponsors = data.sponsors;
                    dataStore.set('organization.sponsors', data.sponsors);
                });
            }, (response) => {
            });
        }
    };
</script>

<style>
    @media screen and (min-width: 700px) {
        #sponsorship {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }
</style>