<template>
    <div id="users">
        <h1>La liste des participants</h1>
        <div v-for="user in users">
            <div class="user">
                <h4>
                    <router-link :to="{name: 'displayUser',params: {id: user._id}}">{{user.firstName | capitalize}} {{user.lastName | uppercase}}</router-link>
                </h4>
                <div class="school"><span class="special">Établissement :</span> {{user.school.institution}}</div>
                <div class="studyLevel"><span class="special">Niveau d'étude :</span><span> Bac +<span class="integer">{{user.school.studyYear}}</span></span></div>
                <span class="special">Biographie :</span>
                <div class="bio">{{user.biography}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import dataStore from '../stores/DataStore';
    export default {
        filters: {
            capitalize: function(value) {
                if (!value) {
                    return '';
                }
                value = value.toString();
                return value.charAt(0).toUpperCase() + value.slice(1);
            },
            uppercase: function(value) {
                if (!value) {
                    return '';
                }
                value = value.toString();
                return value.toUpperCase();
            }
        },
        data(){
            return {
                users: dataStore.get('users', [])
            };
        },
        mounted(){
            this.$http.get('/api/user').then((response) => {
                if (response.status === 200) {
                    response.json().then((message) => {
                        console.log(message.data);
                        this.users = message.data;
                        dataStore.set('users', message.data);
                    });
                } else {
                    this.users = [];
                }
            });
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
