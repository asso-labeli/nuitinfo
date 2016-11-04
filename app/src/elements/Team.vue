<template>
    <div>
        <div v-if="hasTeam">
            <h4 class="center">
                <b>{{team.name}}</b>
            </h4>
            <span class="special">Description :</span>
            <div class="description" v-html="nl2br(team.description)"></div>
            <div class="leader"><span class="special">Leader :</span>
                <span class="capitalized">{{team.members.leader.firstName}}</span>
                <span class="upperCased">{{team.members.leader.lastName}}</span>
                <router-link :to="{name: 'displayUser', params: {id: team.members.leader._id}}">Voir le profil
                </router-link>
            </div>
            <div v-if="team.members.list.length > 0">
                <span class="special">Membre<span
                        v-if="team.members.list.length > 1">s</span> ({{team.members.list.length}}):</span>
                <div>
                    <ul>
                        <li v-for="member in team.members.list">
                            <span class="capitalized">{{member.firstName}}</span>
                            <span class="upperCased">{{member.lastName}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else>
                <span class="special">Aucun membre</span>
            </div>
            <div v-if="teamLeader">
                <span class="special">Candidatures en attente de réponse :</span>
                <div>
                    <ul>
                        <li v-for="application in applications">
                            <span class="capitalized">{{application.user.firstName}}</span>
                            <span class="upperCased">{{application.user.lastName}}</span>
                            <router-link :to="{name: 'displayUser', params: {id: application.user._id}}">Voir le
                                profil
                            </router-link>
                            <a v-on:click.stop.prevent="accept(application._id)">Accepter</a>
                            <a v-on:click.stop.prevent="refuse(application._id)">Refuser</a>
                        </li>
                    </ul>
                </div>


                <router-link :to="{name:'users'}">Recruter des membres</router-link>
                <br/>
                <a href="#">Éditer les informations de l'équipe</a>
                <br/>
                <a href="#">Dissoudre l'équipe</a>
            </div>
        </div>
        <div v-else>
            <p>Tu n'as pas d'équipe, tu peux : </p>
            <ul>
                <li>
                    <router-link :to="{name: 'createTeam'}">Créer une équipe</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'teams'}">Postuler dans une équipe</router-link>
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
                team: {
                    members: {}
                },
                applications: [],
                teamLeader: false
            };
        },
        methods: {
            nl2br: function (str) {
                str = String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br/>' + '$2');
            },
            accept: function (applicationID) {
                this.$http.post('/api/application/accept', JSON.stringify({application: applicationID}), {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response1) => {
                    this.$router.push({name: 'dashboard'});
                });
            },
            refuse: function (applicationID) {
                this.$http.post('/api/application/refuse', JSON.stringify({application: applicationID}), {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response1) => {
                    this.$router.push({name: 'dashboard'});
                });
            }
        },
        mounted(){
            this.$http.get('/api/user/me', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response1) => {
                response1.json().then((message1) => {
                    user.setUser(message1.data);
                    let hasTeam = message1.data.hasOwnProperty('team');
                    this.teamLeader = message1.data.team.isLeader;
                    if (hasTeam) {
                        this.$http.get('/api/team/' + message1.data.team._id).then((response2) => {
                            response2.json().then((message2) => {
                                this.team = message2.data;
                                this.hasTeam = true;
                            });
                        });
                        if (this.teamLeader) {
                            this.$http.get('/api/application/forTeam', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response3) => {
                                response3.json().then((message3) => {
                                    this.applications = message3.data;
                                })
                            });
                        }
                    }
                });
            }, (response) => {
                console.warn('Erreur Team.vue /api/user/me');
            });
        }
    }
</script>