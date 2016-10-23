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
    </div>
</template>

<script>
    export default {
        data () {
            return {
                title: "Planning de la Nuit",
                paragraphs: [],
                days: []
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
        }
    };
</script>


