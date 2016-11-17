<template>
    <div id="app">
        <NuitInfoMenu></NuitInfoMenu>
        <router-view></router-view>
        <NuitInfoFooter></NuitInfoFooter>
    </div>
</template>

<script>
    import NuitInfoMenu from './elements/Menu.vue';
    import NuitInfoFooter from './elements/Footer.vue';
    import user from './stores/UserStore';

    export default {
        name: 'app',
        components: {NuitInfoMenu, NuitInfoFooter},
        data () {
            return {
                title: "Nuit de l'Info 2016 - Édition Bordelaise"
            }
        },
        mounted(){
            if (user.getToken()) {
                this.$http.get('/api/user/me', {headers: {Authorization: 'JWT ' + user.getToken()}}).then((response) => {
                    response.json().then((message) => {
                        if (message.success === 1) {
                            user.setUser(message.data);
                        }
                    });
                }, (response) => {
                    console.warn('Erreur App.vue /api/user/me');
                });
            }
        }
    };
</script>

<style>
    body {
        font-family: 'Inconsolata', sans-serif;
        font-weight: 700;
        background: rgb(9, 31, 41);
        font-size: 1.1em;
        margin: 0;
        color: white;
    }

    #app {
        background: #123E52;
    }

    a, label, .button, input[type="submit"], input[type="checkbox"], input[type="radio"], input[type="option"], input[type="select"], a img, a div, a span {
        cursor: pointer
    }

    a {
        color: #1ADD00;
        text-decoration: none;
    }

    h2 {
        margin: 0;
        padding: 1em 0;
        font-size: 1.8em;
        font-weight: 900;
    }

    h2:first-child {
        padding-top: 0;
    }

    h3 {
        margin: 0;
        padding: 0;
        font-size: 1.5em;
        font-weight: 900;
    }

    h4 {
        margin: 0;
        padding-top: 0.5em;
        font-size: 1.2em;
        font-weight: 900;
    }

    b {
        color: #F4D700;
        font-weight: 900;
    }

    .title:before {
        content: '// ';
    }

    .title {
        color: #0081FF;
        font-style: italic;
        padding-bottom: 0.5em;
    }

    .title a {
        color: #0081FF;
    }

    .titleCentered:before {
        content: '/****** ';
    }

    .titleCentered:after {
        content: ' ******/';
    }

    .titleCentered {
        text-align: center;
        color: #17A4CB;
        font-style: italic;
    }

    .flexbox {
        display: flex;
    }

    .flexbox-center {
        display: flex;
        justify-content: center;
    }

    .flexbox-wrap {
        display: flex;
        flex-wrap: wrap;
    }

    @media screen and (min-width: 700px) {
        h1 {
            text-align: center;
            margin: 50px 0px;
        }

        .center {
            display: block;
            margin: auto;
            text-align: center;
        }
    }

    .orange {
        color: #FF9F00 !important;
    }

</style>
