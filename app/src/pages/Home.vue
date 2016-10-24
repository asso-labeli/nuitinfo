<template>
    <div id="home" class="responsive">

        <h1>Nuit de l'Info 2016 - Édition Bordelaise</h1>

        <div class="presentation" v-for="part in paragraphs">
            <h2 class="title">{{ part.title }}</h2>
            <div>
                <span v-for="line in part.content" v-html="line + '<br/>'"></span>
            </div>
        </div>

        <div class="agenda" id="calendar">
            <h2 class="title">{{ title }}</h2>
            <div v-for="day in days">
                <h4>{{ day.title }}</h4>
                <div class="event" v-for="event in day.events">
                    <div class="date">&nbsp;<span class="orange">*</span> {{ event.hour }}</div>
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
                    <router-link :to="{name: 'recovery'}">Perte de votre compte<span class="special">;</span>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="statistics">
            <h2 class="title"><a href="/stats">Statistiques</a></h2>
            <div class="flexbox flexbox-wrap flexbox-center">
                <div class="participants">{ <a href="#"><span>participants : <span
                        class="integer">{{ users }}</span></span></a>
                    ,
                </div>
                <div class="teams">&nbsp;<a href="#"><span>teams :  <span class="integer">{{ teams }}</span></span></a>
                    }
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                title: "Planning de la Nuit",
                paragraphs: [],
                days: [],
                users: 0,
                teams: 0
            };
        },
        mounted () {
            this.$http.get('/src/data/home/schedule.json').then((response) => {
                response.json().then((data) => {
                    this.title = data.title;
                    this.days = data.days;
                })
            }, (response) => {

            });
            this.$http.get('/src/data/home/presentation.json').then((response) => {
                response.json().then((data) => {
                    this.paragraphs = data.paragraphs;
                })
            }, (response) => {

            });
            /*
                        this.$http.get('/api/statistics/users').then((response) => {
                            response.json().then((data) => {
                                this.users = data.value;
                            })
                        }, (response) => {
                        });
                        */
        }
    };
</script>


