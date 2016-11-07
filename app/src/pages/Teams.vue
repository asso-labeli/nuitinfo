<template>
    <div id="teams" class="page">
        <h1>La liste des équipes</h1>
        <h4><span>Nombre d'équipes : <span class="integer">{{teams.length}}</span></span></h4>
        <div v-for="team in teams">
            <div class="team">
                <h4 class="center">
                    <b>{{team.name}}</b>
                </h4>
                <div class="applicationState">Candidatures <b v-if="team.openForApplications">ouvertes</b><b v-else>fermées</b></div>
                <div v-if="team.openForApplications && displayApplication">
                    <a v-on:click.stop.prevent="apply(team._id)">Postuler dans cette équipe</a>
                </div>
                <div>
                    <span class="integer">{{team.members.list.length + 1}}</span> <span class="special">membre<span v-if="team.members.list.length > 0">s</span>
                </div>
                <span class="special">Description :</span>
                <div class="description">{{team.description}}</div>
                <div>
                    <router-link :to="{name: 'displayTeam', params: {id: team._id}}">Afficher le profil</router-link>
                </div>
            </div>
            <separator></separator>
        </div>
    </div>
</template>

<script>
    import user from '../stores/UserStore';
    import dataStore from '../stores/DataStore';
    import Separator from '../elements/Separator.vue';
    export default {
        components: {Separator},
        data(){
            return {
                teams: dataStore.get('teams', []),
                displayApplication: false
            };
        },
        mounted(){
            this.$http.get('/api/team').then((response) => {
                if (response.status === 200) {
                    response.json().then((message) => {
                        this.teams = message.data;
                        dataStore.set('teams', message.data);
                    });
                } else {
                    this.teams = [];
                }
            });

            if (user.getToken()) {
                this.$http.get('/api/user/me', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                    if (response.status === 200) {
                        response.json().then((message) => {
                            user.setUser(message.data);
                            this.displayApplication = !message.data.hasOwnProperty('team');
                        });
                    } else {
                        this.displayApplication = false;
                    }
                });
            } else {
                this.displayApplication = false;
            }
        },
        methods: {
            apply: function(teamID) {
                if (user.getToken()) {
                    this.$http.get('/api/user/me', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                        if (response.status === 200) {
                            response.json().then((message) => {
                                user.setUser(message.data);
                                this.$http.post('/api/application/fromUser', JSON.stringify({
                                    user: user.getID(),
                                    team: teamID
                                }), {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                                    this.$router.push({name: 'dashboard'})
                                })
                            });
                        }
                    });
                }
            }
        }
    }

</script>

<style>
    @media screen and (min-width: 700px) {
        #teams {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }

</style>