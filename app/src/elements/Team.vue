<template>
    <div>
        <div v-if="hasTeam">
            <h4 class="center">
                <b>{{team.name}}</b>
            </h4>
            <div class="email">
                <span class="special">Adresse email de l'équipe:</span>
                <span>&lt;<a v-bind:href="'mailto:' + team.members.leader.email">{{team.email}}</a>&gt;</span>
            </div>
            <span class="special">Description :</span>
            <div class="description" v-html="nl2br(team.description)"></div>
            <div class="leader">
                <span class="special">Leader :</span>
                <span class="capitalized">{{team.members.leader.firstName}}</span>
                <span class="upperCased">{{team.members.leader.lastName}}</span>
                <span>&lt;<a
                        v-bind:href="'mailto:' + team.members.leader.email">{{team.members.leader.email}}</a>&gt;</span>
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
                            <span>&lt;<a v-bind:href="'mailto:' + member.email">{{member.email}}</a>&gt;</span>
                            <router-link :to="{name: 'displayUser', params: {id: member._id}}" class="blue">Voir le
                                profil
                            </router-link>
                            <a v-if="teamLeader" v-on:click.stop.prevent="kick(member._id)" class="red">Expulser</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else>
                <span class="special">Aucun membre</span>
            </div>
            <div v-if="teamLeader">

                <span class="special">Demandes logistiques :</span>
                <div class="logisticsRequirements" v-html="nl2br(team.logisticsRequirements)"></div>

                <separator></separator>

                <div>
                    <span class="special">Candidatures en attente de réponse ({{applications.length}}) :</span>
                    <ul>
                        <li v-for="application in applications">
                            <span class="capitalized">{{application.user.firstName}}</span>
                            <span class="upperCased">{{application.user.lastName}}</span>
                            <span>&lt;<a v-bind:href="'mailto:' + application.user.email">{{application.user.email}}</a>&gt;</span>
                            <router-link :to="{name: 'displayUser', params: {id: application.user._id}}" class="blue">
                                Voir le
                                profil
                            </router-link>
                            <a v-on:click.stop.prevent="accept(application._id)">Accepter</a>
                            <a v-on:click.stop.prevent="refuse(application._id)" class="red">Refuser</a>
                        </li>
                    </ul>
                </div>

                <separator></separator>

                <router-link :to="{name:'users'}">Recruter des membres</router-link>
                <br/>
                <a v-on:click.stop.prevent="wip()">Éditer les informations de l'équipe</a>
                <br/>
                <a v-on:click.stop.prevent="wip()">Dissoudre l'équipe</a>
            </div>
            <div v-else>
                <a v-on:click.stop.prevent="leave(team._id)">Quitter l'équipe</a>
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

            <div v-if="applications.length > 0">
                <span class="special">Propositions en attente de réponse ({{applications.length}}) :</span>
                <ul>
                    <li v-for="application in applications">
                        Équipe {{application.team.name}}
                        <span>&lt;<a v-bind:href="'mailto:' + application.team.email">{{application.team.email}}</a>&gt;</span>
                        <router-link :to="{name: 'displayTeam', params: {id: application.team._id}}" class="blue">
                            Voir le
                            profil
                        </router-link>
                        <a v-on:click.stop.prevent="accept(application._id)">Accepter</a>
                        <a v-on:click.stop.prevent="refuse(application._id)" class="red">Refuser</a>
                    </li>
                </ul>
            </div>

            <div v-if="candidatures.length > 0">
                <span class="special">Candidatures déposées ({{candidatures.length}}) :</span>
                <ul>
                    <li v-for="candidature in candidatures">
                        Équipe {{candidature.team.name}}
                        <router-link :to="{name: 'displayTeam', params: {id: candidature.team._id}}" class="blue">
                            Voir le
                            profil
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import user from '../stores/UserStore';
    import Separator from '../elements/Separator.vue';
    export default {
        components: {Separator},
        data() {
            return {
                hasTeam: false,
                team: {
                    members: {}
                },
                applications: [],
                candidatures: [],
                teamLeader: false
            };
        },
        methods: {
            wip: function () {
                alert('Cette fonctionnalité est en cours de développement. Désolé pour la gêne occasionnée.');
            },
            nl2br: function (str) {
                str = String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br/>' + '$2');
            },
            accept: function (applicationID) {
                this.$http.post('/api/application/accept', JSON.stringify({application: applicationID}), {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                    this.$router.go({
                        path: this.$route,
                        query: {
                            t: +new Date()
                        }
                    });
                });
            },
            refuse: function (applicationID) {
                this.$http.post('/api/application/refuse', JSON.stringify({application: applicationID}), {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                    this.$router.go({
                        path: this.$route,
                        query: {
                            t: +new Date()
                        }
                    });
                });
            },
            kick: function (userID) {
                this.$http.post('/api/team/kick', JSON.stringify({user: userID}), {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                    this.$router.go({
                        path: this.$route,
                        query: {
                            t: +new Date()
                        }
                    });
                });
            },
            leave: function (userID) {
                this.$http.post('/api/team/leave', JSON.stringify({}), {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                    this.$router.go({
                        path: this.$route,
                        query: {
                            t: +new Date()
                        }
                    });
                });
            }
        },
        mounted(){
            this.$http.get('/api/user/me', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response1) => {
                response1.json().then((message1) => {
                    user.setUser(message1.data);
                    let hasTeam = message1.data.hasOwnProperty('team') && message1.data.team !== null;
                    if (hasTeam) {
                        this.teamLeader = message1.data.team.isLeader;
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
                    } else {
                        this.$http.get('/api/application/forUser', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                            response.json().then((message) => {
                                this.applications = message.data;
                            })
                        });
                        this.$http.get('/api/application/forUser/waiting', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                            response.json().then((message) => {
                                this.candidatures = message.data;
                            })
                        });
                    }
                });
            }, (error) => {
                console.warn('Erreur Team.vue /api/user/me');

                error.json().then((message) => {
                    console.warn(message);
                });
            });
        }
    }
</script>