<template>
    <div v-if="isNightStarted">
        La nuit est en cours de développement !<br>
        Y'a un discord pour le support et pour le flood ou pour du vocal entre nous.
        C'est ici : <a href="https://discord.gg/DcYur6f" target="_blank">https://discord.gg/DcYur6f</a>
        <br/><br/>
        <h3>Site national</h3>
        <p>
            Le leader de la team a du recevoir <b>DEUX</b> emails sur la boite mail qu'il a renseigné sur ce site.<br/>
            Un des emails contient le couple login/password pour se connecter au
            <a href="http://www.nuitdelinfo.com/n2i/users/loginform" target="_blank">site national</a>.
            <br>
            Et l'autre contient le couple login/password pour se connecter au
            <a href="http://mass-talk.univ-tlse2.fr/" target="_blank">forum national</a>.
            <br>
        </p>
        D'autres informations pourront apparaître ici :)
    </div>
    <div v-else>
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
                startNDI: new Date(2016, 11, 1, 16, 40, 0, 0),
                endNDI: new Date(2016, 11, 2, 8, 0, 0, 0),
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
            },
            isNightStarted: function() {
                return this.start;
            }
        },
        mounted() {
            var self = this;
            var startNDITimestamp = this.startNDI.getTime();
            var endNDITimestamp = this.endNDI.getTime();

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
