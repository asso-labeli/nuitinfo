<template>
    <div id="help" class="page">
        <h1>Guide &amp; Aide</h1>

        <div class="questions">
            <div class="faq" v-for="chapter in faq">
                <h2 class="titleCentered">{{chapter.title}}</h2>
                <div v-for="part in chapter.parts">
                    <h3 class="title">{{part.title}}</h3>
                    <p>
                        <span v-for="line in part.lines" v-html="line + '<br/>'"></span>
                    </p>
                </div>
            </div>

            <h2 class="titleCentered">Le concours</h2>

            <h3 class="title">Compétences requises</h3>
            <div v-for="skill in skills">
                Voici les compétences requises lors de l'édition {{skill.year}} :
                <ul>
                    <li v-for="spec in skill.list">
                        <span class="special">{{spec.title}}</span><span v-if="spec.description !== undefined"> : {{spec.description}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import dataStore from '../stores/DataStore';
    export default {
        data () {
            return {
                faq: dataStore.get('help.faq', []),
                skills: dataStore.get('help.skills', [])
            };
        },
        mounted () {
            this.$http.get('/src/data/help/skills.json').then((response) => {
                response.json().then((data) => {
                    this.skills = data;
                    dataStore.set('help.skills', data.skills);
                });
            });
            this.$http.get('/src/data/help/faq.json').then((response) => {
                response.json().then((data) => {
                    this.faq = data;
                    dataStore.set('help.faq', data.faq);
                });
            });
        }
    };
</script>

<style>
    @media screen and (min-width: 700px) {
        #help {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }
</style>