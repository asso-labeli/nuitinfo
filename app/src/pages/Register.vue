<template>
    <div id="register">
        <h1>Enregistrement</h1>
        <form v-on:submit.prevent="submit" class="userForm">
            <input type="hidden" name="post" value="post"/>

            <h2 class="title" style="padding-top: 0">Informations personnelles</h2>
            <div class="formField">
                <div class="labelWrapper">
                    <label for="email"><span class="special">Email :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="email" type="email" v-model="user.email" required="required"/>
                </div>
            </div>

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
                    <input id="birthday" type="date" v-model="user.birthday" required="required"
                           placeholder="dd/mm/aaaa"
                           pattern="(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d"/>
                </div>
            </div>

            <div class="textareaField">
                <div class="labelWrapper">
                    <label for="bio"><span class="special">Biographie :</span></label>
                </div>
                <div class="contentWrapper">
                    <textarea id="bio" v-model="user.bio"></textarea>
                </div>
            </div>

            <h2 class="title">Logistique</h2>
            <div class="radioField">
                <div class="labelWrapper">
                    <label>Apporteras-tu <b>ton propre matériel</b> ? : </label>
                </div>
                <div class="radioWrapper">
                    <input id="noHardware" type="radio" name="hardware" value="0"/>
                    <label for="noHardware">Non</label>
                    <input id="hardware" type="radio" name="hardware" value="1" checked="checked"/>
                    <label for="hardware">Oui</label>
                </div>
            </div>

            <div class="radioField">
                <div class="labelWrapper">
                    <label>Quel <b>type</b> de matériel apporteras-tu ? : </label>
                </div>
                <div class="radioWrapper">
                    <input id="laptop" type="radio" name="hardwareType" value="laptop" checked="checked"/>
                    <label for="laptop">Ordinateur portable</label>
                    <input id="UC" type="radio" name="hardwareType" value="UC"/>
                    <label for="UC">Ordinateur de bureau</label>
                </div>
            </div>

            <div class="radioField">
                <div class="labelWrapper">
                    <label>Est-il équipé du <b>WiFi</b> ? : </label>
                </div>
                <div class="radioWrapper">
                    <input id="wifi" type="radio" name="wifi" value="1"/>
                    <label for="wifi">Oui</label>
                    <input id="noWifi" type="radio" name="wifi" value="0" checked="checked"/>
                    <label for="noWifi">Non</label>
                </div>
            </div>

            <h2 class="title">Engagements</h2>

            <div style="display:flex;flex-direction: row;">
                <label for="cremiCharter">Je déclare avoir pris connaissance de la charte d'utilisation du CREMI et de
                    la suivre : </label>
                <input type="checkbox" id="cremiCharter" v-model="user.cremiCharter"/>
            </div>

            <div style="display:flex;flex-direction: row;">
                <label for="mailForRecruitment">J'accepte que mon e-mail soit communiqué à nos partenaires
                    <b>uniquement</b> à des fins de recrutement : </label>
                <input type="checkbox" id="mailForRecruitment" v-model="user.mailForRecruitment"/>
            </div>


            <div class="actions">
                <a class="special" href="/home">back();</a>
                <input type="submit" class="special" value="submit(this);"/>
            </div>
        </form>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                user: {
                    email: 'default@email.com',
                    username: 'login',
                    password: 'password',
                    firstName: 'John',
                    lastName: 'Snow',
                    birthday: '1970-01-01',
                    school: '',
                    material: true,
                    isDesktop: false,
                    hasWiFi: true,
                    mailForRecruitment: true,
                    cremiCharter: false
                }
            };
        },
        methods: {
            submit() {
                console.log(JSON.stringify(this.user));
                /*
                this.$http.post('/api/user/add', JSON.stringify(this.user)).then((response) => {
                    console.log('Success');
                }, (response) => {
                    console.log('Error');
                });
                */
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
</style>