<template>
    <div id="displayUser" class="page">
        <h1 v-if="displayUser">
            <span class="capitalized">{{user.firstName}}</span>
            <span class="upperCased">{{user.lastName}}</span>
        </h1>
        <h1 v-else>Utilisateur non trouvé</h1>
        <div class="user" v-if="displayUser">
            <div class="school"><span class="special">Établissement :</span> {{user.school.institution.name}}</div>
            <div class="studyLevel"><span class="special">Niveau d'étude :</span><span> Bac +<span class="integer">{{user.school.studyYear}}</span></span></div>
            <span class="special">Biographie :</span>
            <div class="bio">{{user.biography}}</div>
            <div v-if="user.hasOwnProperty('team')">
                Ce participant est dans l'équipe "
                <router-link :to="{name: 'displayTeam', params: {id: user.team._id}}">{{user.team.name}}</router-link>
                "
            </div>
            <div v-else>
                Ce participant est <span class="special">en recherche</span> d'une équipe.
                <div v-if="displayApplication">
                    <a v-on:click.stop.prevent="apply(user._id)">Recruter ce participant</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import user from '../stores/UserStore';
    export default {
        data(){
            return {
                displayUser: false,
                user: {},
                displayApplication: false
            };

        },
        mounted(){
            if (this.$route.params.hasOwnProperty('id')) {
                let userID = this.$route.params.id;
                this.$http.get('/api/user/' + userID).then((response) => {
                    response.json().then((message) => {
                        this.user = message.data;
                        this.displayUser = true;
                    });
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
            }
        },
        methods: {
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
    };
</script>

<style>
    @media screen and (min-width: 700px) {
        #displayUser {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }
</style>