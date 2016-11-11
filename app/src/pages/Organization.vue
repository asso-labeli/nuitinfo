<template>
    <div id="sponsorship" class="page">
        <h1>Organisation</h1>
        <h2>Envie de devenir partenaire de l'événement bordelais ?</h2>
        <p>Vous trouverez notre plaquette d'information pour nos partenaires privés à <a href="">cette adresse</a></p>
        <div v-for="sponsor in sponsors" class="categories">
            <h2 class="title">{{ sponsor.type }}</h2>
            <div v-for="partner in sponsor.partners" class="sponsor-description">
                <a v-bind:href="partner.website" target="_blank" class="sponsor">
                    <div class="logo">
                        <img v-bind:src="partner.logo" v-bind:alt="'Logo de ' + partner.name" v-if="partner.logo !== ''"/>
                    </div>
                    <span>{{ partner.name }}</span>
                </a>
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

<style scoped>
    @media screen and (min-width: 700px) {
        #sponsorship {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }

    .sponsor {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: flex-start;
        align-items: center;
    }

    .sponsor .logo {
        display: flex;
        flex-direction: row;
        width: 150px;
        align-items: center;
        align-content: center;
        justify-content: center;
    }

    .sponsor img {
        max-width: 100px;
        max-height: 50px;
    }

    .categories {
        margin-top: 2em;
    }

    .sponsor-description {
        margin-top: 1em;
    }

    .sponsor-description:first-child {
        margin-top: 0;
    }

</style>