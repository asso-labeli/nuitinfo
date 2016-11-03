<template>
    <h1>La liste des équipes</h1>
    <div v-for="team in teams">
        <div>{{team.name}}</div>
        <div>{{team.descrition}}</div>
        <div v-if="team.logisticsRequirements">Cette équipe recrute des membres</div>
        <div v-else>Cette équipe ne recrute pas de membre</div>
    </div>
</template>

<script>
    import dataStore from '../stores/DataStore';
    export default {
        data(){
            return {
                teams: dataStore.get('teams', [])
            };
        },
        mounted(){
            this.$http.get('/api/team').then((response) => {
                if (response.status === 200) {
                    response.json().then((message) => {
                        console.log(message.data);
                        this.teams = message.data;
                        dataStore.set('teams', message.data);
                    });
                } else {
                    this.teams = [];
                }
            });
        }
    }
</script>
