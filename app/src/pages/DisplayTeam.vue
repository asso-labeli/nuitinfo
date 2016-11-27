<template>
    <div id="displayTeam" class="page">
        <h1 v-if="displayTeam">{{team.name}}</h1>
        <h1 v-else>Équipe non trouvée</h1>
        <div class="team" v-if="displayTeam">

            <div v-if="!isEmpty(team.description)">
                <span class="special">Description :</span>
                <div class="description" v-html="nl2br(team.description)"></div>
            </div>

            <h2 class="title">Candidatures</h2>
            <div class="applicationState">Candidatures
                <b v-if="team.openForApplications">ouvertes</b>
                <b v-else>fermées</b>

                <div v-if="team.openForApplications && displayApplication">
                    <a v-on:click.stop.prevent="apply(team._id)">Postuler dans cette équipe</a>
                </div>
            </div>

            <h2 class="title">Composition</h2>
            <div class="leader"><span class="special">Leader :</span>
                <span class="capitalized">{{team.members.leader.firstName}}</span>
                <span class="upperCased">{{team.members.leader.lastName}}</span>
                <router-link :to="{name: 'displayUser', params: {id: team.members.leader._id}}">Voir le profil
                </router-link>
            </div>


            <div v-if="team.members.list.length > 0">
                <span class="special">Membre<span
                        v-if="team.members.list.length > 1">s</span> ({{team.members.list.length}}) :</span>
                <div>
                    <ul>
                        <li v-for="member in team.members.list">
                            <span class="capitalized">{{member.firstName}}</span>
                            <span class="upperCased">{{member.lastName}}</span>
                            <router-link :to="{name: 'displayUser', params: {id: member._id}}">Voir le
                                profil
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else>
                <span class="special">Aucun membre</span>
            </div>
        </div>
    </div>
</template>

<script>
    import user from '../stores/UserStore';
    import * as tools from '../libraries/tools';
    export default {
        data(){
            return {
                displayTeam: false,
                team: {},
                displayApplication: false
            };
        },
        mounted(){
            if (this.$route.params.hasOwnProperty('id')) {
                let userID = this.$route.params.id;
                this.$http.get('/api/team/' + userID).then((response) => {
                    response.json().then((message) => {
                        this.team = message.data;
                        this.displayTeam = true;
                    });
                });

                if (user.getToken()) {
                    this.$http.get('/api/user/me', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                        if (response.status === 200) {
                            response.json().then((message) => {
                                user.setUser(message.data);
                                this.displayApplication = !(message.data.hasOwnProperty('team') && message.data.team.isLeader);
                            });
                        } else {
                            this.displayApplication = false;
                        }
                    });
                } else {
                    this.displayApplication = false;
                }
            }
        },
        methods: {
            isEmpty: function (o) {
                return tools.isEmpty(o);
            },
            nl2br: function (str) {
                str = String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br/>' + '$2');
            },
            apply: function (teamID) {
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
    };
</script>

<style>
    @media screen and (min-width: 700px) {
        #displayTeam {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }
</style>