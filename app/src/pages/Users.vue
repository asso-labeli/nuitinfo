<template>
    <div id="users" class="page">
        <h1>La liste des participants</h1>
        <h4><span>Nombre de participants : <span class="integer">{{users.length}}</span></span></h4>
        <div v-for="user in users">
            <div class="user">
                <h4 class="center">
                    <b>
                        <span class="capitalized">{{user.firstName}}</span>
                        <span class="upperCased">{{user.lastName}}</span>
                    </b>
                </h4>
                <div class="school"><span class="special">Établissement :</span> {{user.school.institution.name}}</div>
                <div class="studyLevel"><span class="special">Niveau d'étude :</span><span> Bac +<span
                        class="integer">{{user.school.studyYear}}</span></span></div>
                <span class="special">Biographie :</span>
                <div class="bio">{{nl2br(user.biography)}}</div>
                <div v-if="checkTeam(user)">
                    Ce participant est dans l'équipe "
                    <router-link
                            :to="{name: 'displayTeam', params: {id: user.team._id}}">{{user.team.name}}</router-link>
                    "
                </div>
                <div v-else>
                    Ce participant est <span class="special">en recherche</span> d'une équipe.
                    <div v-if="displayApplication">
                        <a v-on:click.stop.prevent="apply(user._id)">Recruter ce participant</a>
                    </div>
                </div>
                <div>
                    <router-link :to="{name: 'displayUser', params: {id: user._id}}">Afficher le profil</router-link>
                </div>
            </div>
            <separator></separator>
        </div>
    </div>
</template>

<script>
    import user from '../stores/UserStore';
    import Separator from '../elements/Separator.vue';
    import dataStore from '../stores/DataStore';
    export default {
        components: {Separator},
        data(){
            return {
                users: [],
                displayApplication: false
            };
        },
        mounted(){
//            this.users = dataStore.get('users', []);
            this.$http.get('/api/user').then((response) => {
                if (response.status === 200) {
                    response.json().then((message) => {
                        this.users = message.data;
                        dataStore.set('users', message.data);
                    });
                } else {
                    this.users = [];
                }
            });

            if (user.getToken()) {
                this.$http.get('/api/user/me', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                    if (response.status === 200) {
                        response.json().then((message) => {
                            user.setUser(message.data);
                            this.displayApplication = message.data.hasOwnProperty('team') && message.data.team.isLeader;
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
            checkTeam: function(user) {
                return user.hasOwnProperty('team') && user.team !== null;
            },
            nl2br: function(str) {
                str = String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br/>' + '$2');
            },
            apply: function(userID) {
                if (user.getToken()) {
                    this.$http.get('/api/user/me', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                        if (response.status === 200) {
                            response.json().then((message) => {
                                user.setUser(message.data);
                                this.$http.post('/api/application/fromTeam', JSON.stringify({
                                    user: userID,
                                    team: message.data.team._id
                                }), {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                                    console.info('Success');
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
        #users {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }
</style>
