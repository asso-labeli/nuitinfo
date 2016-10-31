<template>
    <div>
        Il reste <b><span>{{getDays}}</span> jours</b>,
        <b><span>{{getHours}}</span> heure<span v-if="getHours > 1">s</span></b>,
        <b><span>{{getMinutes}}</span> minute<span v-if="getMinutes > 1">s</span></b> et
        <b><span>{{getSeconds}}</span> seconde<span v-if="getSeconds > 1">s</span></b>
        avant <span v-if="count.start">le début</span><span v-else>la fin</span> de la Nuit
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0,
                    start: true
                }
            };
        },
        computed: {
            getDays: function() {
                return this.count.days;
            },
            getHours: function() {
                return this.count.hours;
            },
            getMinutes: function() {
                return this.count.minutes;
            },
            getSeconds: function() {
                return this.count.seconds;
            },
            getMilliseconds: function() {
                return this.count.milliseconds;
            }
        },
        mounted() {
            var self = this;
            var startNDI = new Date(2016, 11, 1, 16, 40, 0, 0);
            var startNDITimestamp = startNDI.getTime();
            var endNDI = new Date(2016, 11, 2, 8, 0, 0, 0);
            var endNDITimestamp = endNDI.getTime();

            function a() {
                let now = new Date();
                let nowTimestamp = now.getTime();
                let diff = startNDITimestamp - nowTimestamp;

                if (diff < 0) {
                    self.count.start = false;
                    diff = endNDITimestamp - nowTimestamp;
                }
                let ms = diff % 1000;
                self.count.milliseconds = ms;

                let ts = (diff - ms) / 1000;
                let s = ts % 60;
                self.count.seconds = s;

                let tm = (ts - s) / 60;
                let m = tm % 60;
                self.count.minutes = m;

                let th = (tm - m) / 60;
                let h = th % 24;
                self.count.hours = h;

                self.count.days = (th - h) / 24;
            }

            a();
            window.setInterval(a, 999);
        }
    }
</script>
