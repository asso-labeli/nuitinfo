<template>
    <div id="logout">
        <h1>Déconnexion en cours</h1>
    </div>
</template>

<script>
    import user from '../stores/UserStore';
    export default {
        mounted(){
            user.logout();
            this.$router.push({name: 'home'});
        }
    };
</script>

<style>
    @media screen and (min-width: 700px) {
        #logout {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }
</style>