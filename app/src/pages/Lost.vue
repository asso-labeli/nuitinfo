<template>
    <div id="lost">
        <h1>Perdu ?</h1>
        <router-link :to="{name: 'home'}">Retour à l'accueil</router-link>
    </div>
</template>

<style>
    @media screen and (min-width: 700px) {
        #lost {
            padding: 10px;
            padding-bottom: 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }
</style>