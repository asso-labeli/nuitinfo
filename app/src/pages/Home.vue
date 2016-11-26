<template>
    <div id="home" class="responsive page">

        <h1>Nuit de l'Info <span class="integer">2016</span> - Édition Bordelaise</h1>

        <div class="presentation" v-for="part in paragraphs">
            <h2 class="title">{{ part.title }}</h2>
            <div class="paragraph">
                <span v-for="line in part.content" v-html="line + '<br/>'"></span>
            </div>
        </div>

        <div class="agenda" id="calendar">
            <h2 class="title">{{ title }}</h2>
            <div v-for="day in days" class="day">
                <h4>{{ day.title }}</h4>
                <div class="event" v-for="event in day.events">
                    <div class="date">&nbsp;<span class="orange">*</span> <span class="integer">{{ event.hour }}</span>
                    </div>
                    <span class="details" v-html="event.content"></span>
                </div>
            </div>
        </div>

        <div class="register">
            <div class="links">
                <div class="big special">
                    <span>goto </span>
                    <router-link :to="{name: 'help'}">Guide &amp; Aide<span class="special">;</span></router-link>
                </div>
                <div class="big special">
                    <span>goto </span>
                    <router-link :to="{name: 'register'}">S'inscrire<span class="special">;</span></router-link>
                </div>

                <div class="big special">
                    <span>goto </span>
                    <router-link :to="{name: 'login'}">Se connecter<span class="special">;</span>
                    </router-link>
                </div>

                <div class="big special">
                    <span>goto </span>
                    <router-link :to="{name: 'recovery'}">Perte de votre compte<span class="special">;</span>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="statistics">
            <h2 class="title"><a href="/stats">Statistiques</a></h2>
            <div class="flexbox flexbox-wrap flexbox-center">
                <div class="participants">{
                    <router-link :to="{name: 'users'}">
                        <span>participants : <span class="integer">{{ users }}</span></span>
                    </router-link>
                    ,
                </div>
                <div class="teams">&nbsp;
                    <router-link :to="{name: 'teams'}">
                        <span>teams :  <span class="integer">{{ teams }}</span></span>
                    </router-link>
                    }
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import dataStore from '../stores/DataStore';
    export default {
        data () {
            return {
                title: dataStore.get('home.title', "Planning de la Nuit"),
                paragraphs: dataStore.get('home.paragraphs', []),
                days: dataStore.get('home.days', []),
                users: dataStore.get('home.users', 0),
                teams: dataStore.get('home.teams', 0)
            };
        },
        mounted () {

            this.$http.get('/src/data/home/schedule.json').then((response) => {
                response.json().then((data) => {
                    this.title = data.title;
                    dataStore.set('home.title', data.title);
                    this.days = data.days;
                    dataStore.set('home.days', data.days);
                });
            });

            this.$http.get('/src/data/home/presentation.json').then((response) => {
                response.json().then((data) => {
                    this.paragraphs = data.paragraphs;
                    dataStore.set('home.paragraphs', data.paragraphs);
                });
            });

            this.$http.get('/api/statistics/users').then((response) => {
                response.json().then((statistics) => {
                    this.users = statistics.data.users;
                    dataStore.set('home.users', statistics.data.users);
                });
            }, (error) => {
                this.users = 0;
            });

            this.$http.get('/api/statistics/teams').then((response) => {
                response.json().then((statistics) => {
                    this.teams = statistics.data.teams;
                    dataStore.set('home.teams', statistics.data.teams);
                });
            }, (error) => {
                this.teams = 0;
            });
        }
    };
</script>

<style scoped>
    .paragraph {
        margin-bottom: 2em;
    }

    .day {
        margin-bottom: 1em;
    }

    .register {
        margin-bottom: 1.5em;
    }
</style>


