<template>
    <div>
        <div v-if="hasTeam">
            <div>
                <span class="special">{{team.name}}</span>
            </div>
            <p>{{team.description}}</p>
        </div>
        <div v-else>
            <p>Tu n'as pas d'équipe, tu peux : </p>
            <ul>
                <li>
                    <router-link :to="{name: 'createTeam'}">Créer une équipe</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'createTeam'}">Postuler dans une équipe</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import user from '../stores/UserStore';
    export default {
        data() {
            return {
                hasTeam: false,
                team: {}
            };
        },
        mounted(){
            this.$http.get('/api/user/me', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                response.json().then((message) => {
                    user.setUser(message.data);
                    this.hasTeam = message.data.hasOwnProperty('team');
                    if (this.hasTeam) {
                        this.team = message.data.team;
                    }
                });
            }, (response) => {
                console.warn('Erreur Team.vue /api/user/me');
            });
        }
    }
</script>