<template>
    <div id="displayTeam">
        <h1>Affichage équipe</h1>
    </div>
</template>

<script>
    import user from '../stores/UserStore';
    export default {
        data(){
            return {};

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