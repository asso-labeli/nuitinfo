<template>
    <div id="createTeam" class="page">
        <h1>{{title}}</h1>
        <form v-on:submit.prevent="register" class="teamForm">

            <div class="formField">
                <div class="labelWrapper">
                    <label for="name"><span class="special">Nom :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="name" type="text" v-model="team.name" required="required"/>
                </div>
            </div>

            <div class="formField">
                <div class="labelWrapper">
                    <label for="email"><span class="special">Adresse e-mail :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="email" type="email" v-model="team.email" required="required"/>
                </div>
            </div>

            <div class="textareaField">
                <div class="labelWrapper">
                    <label for="description"><span class="special">Description de l'équipe :</span></label>
                </div>
                <div class="contentWrapper">
                    <textarea id="description" v-model="team.description"></textarea>
                </div>
            </div>

            <div class="textareaField">
                <div class="labelWrapper">
                    <label for="logisticsRequirements"><span class="special">Demandes logistiques :</span></label>
                </div>
                <div class="contentWrapper">
                    <textarea id="logisticsRequirements" v-model="team.logisticsRequirements"></textarea>
                </div>
                <div>
                    <i>Notez aussi si vous voulez proche de la salle d'une équipe que vous appréciez</i>
                </div>
            </div>

            <div class="checkbox-line">
                <label for="openForApplications">Cette équipe est ouverte aux candidatures : </label>
                <input type="checkbox" id="openForApplications" v-model="team.openForApplications"/>
            </div>


            <div class="actions">
                <router-link class="special" :to="{name: 'dashboard'}">back();</router-link>
                <input type="submit" class="special" value="submit(this);"/>
            </div>
        </form>
    </div>
</template>

<script>
    import user from '../stores/UserStore';
    export default {
        data(){
            return {
                title: "Création d'équipe",
                team: {
                    name: "",
                    email: "",
                    description: "",
                    logisticsRequirements: "",
                    openForApplications: true,
                }
            }
        },
        computed: {
            editionMode: function() {
                return this.$route.path === '/team/edit' || this.$route.path === '/team/edit/';
            }
        },
        mounted(){
            this.$http.get('/api/user/me', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                response.json().then((message) => {
                    if (message.success === 1) {
                        user.setUser(message.data);
                    }
                });
            }, (response) => {
                console.warn('Erreur de récupération des informations de profil');
            });
            if (this.editionMode) {
                this.title = "Édition d'équipe";
            }
        },
        methods: {
            register() {
                if (this.editionMode) {
                    this.$http.put('/api/team', JSON.stringify(this.team), {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                        this.$router.push({name: 'dashboard'});
                    }, (response) => {
                        console.warn('Erreur de modification de l\'équipe');
                    });
                } else {
                    this.$http.post('/api/team', JSON.stringify(this.team), {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                        this.$router.push({name: 'dashboard'});
                    }, (response) => {
                        console.warn('Erreur d\'ajout d\'une équipe');
                    });
                }
            }
        }
    };
</script>

<style>
    @media screen and (min-width: 700px) {
        #createTeam {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }
</style>