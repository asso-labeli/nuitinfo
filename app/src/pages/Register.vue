<template>
    <div id="register">
        <h1>{{title}}</h1>
        <form v-on:submit.prevent="register" class="userForm">
            <input type="hidden" name="post" value="post"/>

            <h2 class="title" style="padding-top: 0">Informations de connexion</h2>
            <div class="formField">
                <div class="labelWrapper">
                    <label for="email"><span class="special">Adresse e-mail :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="email" type="email" v-model="user.email" required="required"/>
                </div>
            </div>

            <div class="formField" v-if="!editionMode">
                <div class="labelWrapper">
                    <label for="pass"><span class="special">Mot de passe :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="password" type="password" v-model="user.password" required="required"/>
                </div>
            </div>

            <h2 class="title" style="padding-top: 0">Informations personnelles</h2>

            <div class="formField">
                <div class="labelWrapper">
                    <label for="firstName"><span class="special">Prénom :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="firstName" type="text" v-model="user.firstName" required="required"/>
                </div>
            </div>

            <div class="formField">
                <div class="labelWrapper">
                    <label for="lastName"><span class="special">Nom :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="lastName" type="text" v-model="user.lastName" required="required"/>
                </div>
            </div>

            <div class="formField">
                <div class="labelWrapper">
                    <label for="birthday"><span class="special">Date de naissance :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="birthday" type="date" v-model="user.birthday" placeholder="dd/mm/aaaa"
                           pattern="(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d"/>
                </div>
            </div>

            <div class="textareaField">
                <div class="labelWrapper">
                    <label for="bio"><span class="special">Biographie :</span></label>
                </div>
                <div class="contentWrapper">
                    <textarea id="bio" v-model="user.biography"></textarea>
                </div>
            </div>

            <h2 class="title">Logistique</h2>
            <div class="checkbox-line">
                <label for="hasMaterial">Comptes-tu apporter <b>ton propre matériel</b> : </label>
                <input type="checkbox" id="hasMaterial" v-model="user.material.hasMaterial"/>
            </div>

            <div class="checkbox-line">
                <label for="isDesktop">Est-ce que tu apporteras <b>un ordinateur fixe</b> : </label>
                <input type="checkbox" id="isDesktop" v-model="user.material.isDesktop"/>
            </div>

            <div class="checkbox-line">
                <label for="hasWiFi">Est ce que ton matériel est équipé du <b>WiFi</b> : </label>
                <input type="checkbox" id="hasWiFi" v-model="user.material.hasWiFi"/>
            </div>


            <h2 class="title">Compte CREMI</h2>
            <div class="checkbox-line">
                <label for="cremiOwner">Possèdes-tu un compte au CREMI : </label>
                <input type="checkbox" id="cremiOwner" v-model="cremiOwner"/>
            </div>

            <div v-if="!cremiOwner">
                <div class="formField">
                    <div class="labelWrapper">
                        <label for="studentNumber"><span class="special">Numéro étudiant :</span></label>
                    </div>
                    <div class="contentWrapper">
                        <input id="studentNumber" type="text" v-model="user.cremiAccount.studentNumber"/>
                    </div>
                </div>
                <div class="formField">
                    <div class="labelWrapper">
                        <label for="studentMail"><span class="special">Adresse e-mail étudiante :</span></label>
                    </div>
                    <div class="contentWrapper">
                        <input id="studentMail" type="text" v-model="user.cremiAccount.studentMail"/>
                    </div>
                </div>

                <div class="checkbox-line">
                    <label for="cremiCharter">Je déclare avoir pris connaissance de la charte d'utilisation du CREMI et
                        de la suivre : </label>
                    <input type="checkbox" id="cremiCharter" v-model="user.cremiAccount.charter"/>
                </div>
            </div>

            <h2 class="title">Recrutement</h2>

            <div class="checkbox-line">
                <label for="mailForRecruitment">J'accepte que mon e-mail soit communiqué à nos partenaires
                    <b>uniquement</b> à des fins de recrutement : </label>
                <input type="checkbox" id="mailForRecruitment" v-model="user.mailForRecruitment"/>
            </div>


            <div class="actions">
                <router-link class="special" :to="{name: 'home'}">back();</router-link>
                <input type="submit" class="special" value="submit(this);"/>
            </div>
        </form>

    </div>
</template>

<script>
    import user from '../stores/UserStore';
    export default {
        data () {
            return {
                title: "Enregistrement",
                cremiOwner: false,
                user: {
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    birthday: '',
                    biography: '',
                    material: {
                        hasMaterial: true,
                        isDesktop: false,
                        hasWiFi: true
                    },
                    cremiAccount: {
                        studentNumber: null,
                        studentMail: "",
                        charter: false
                    },
                    mailForRecruitment: true
                }
            };
        },
        computed: {
            editionMode: function() {
                return this.$route.path === '/edit' || this.$route.path === '/edit/';
            }
        },
        mounted(){
            if (this.editionMode) {
                this.title = "Édition de profil";
                this.$http.get('/api/user/me', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                    response.json().then((message) => {
                        if (message.success === 1) {
                            user.setUser(message.data);
                            this.user = message.data;
                            this.user.birthday = this.user.birthday.slice(0, 10);
                            this.cremiOwner = !message.data.cremiAccount.needed;
                        }
                    });
                }, (response) => {
                    console.warn('Erreur de récupération des informations de profil');
                });
            }
        },
        methods: {
            register() {
                this.user.cremiAccount.needed = !this.cremiOwner;

                if (this.editionMode) {
                    this.$http.put('/api/user', JSON.stringify(this.user), {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                        this.$router.push({name: 'dashboard'});
                    }, (response) => {
                        console.warn('Erreur de modification');
                    });
                } else {
                    this.$http.post('/api/user', JSON.stringify(this.user)).then((response) => {
                        this.$router.push({name: 'login'});
                    }, (response) => {
                        console.warn('Erreur d\'ajout d\'un utilisateur');
                    });
                }
            }
        }
    };
</script>

<style>
    @media screen and (min-width: 700px) {
        #register {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }

    .checkbox-line {
        display: flex;
        flex-direction: row;
    }
</style>