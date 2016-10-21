<template>
    <div class="agenda" id="calendar">
        <h2 class="title">{{ title }}</h2>
        <div v-for="day in days">
            <h4>{{ day.title }}</h4>
            <div class="event" v-for="event in day.events">
                <div class="date">&nbsp;<span class="special">*</span> {{ date }}</div>
                <span class="details">{{ event.content }}</span>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {};
        }
    };
</script>


