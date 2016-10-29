<template>
    <header>
        <div class="content">
            <router-link :to="{name: 'home'}" id="goHome" exact></router-link>
            <nav id="menu">
                <router-link :to="{name: 'help'}" exact>
                    <div class="tab">
                        Aide
                    </div>
                </router-link>
                <router-link :to="{name: 'organization'}" exact>
                    <div class="tab">
                        Organisation
                    </div>
                </router-link>
                <router-link :to="{name: 'challenges'}" exact>
                    <div class="tab">
                        Défis
                    </div>
                </router-link>
                <router-link v-if="!logged" :to="{name: 'login'}" exact>
                    <div class="tab">
                        Connexion
                    </div>
                </router-link>
                <router-link v-if="!logged" :to="{name: 'register'}" exact>
                    <div class="tab">
                        Inscription
                    </div>
                </router-link>
                <router-link v-if="logged" :to="{name: 'dashboard'}" exact>
                    <div class="tab">
                        Tableau de bord
                    </div>
                </router-link>
                <router-link v-if="logged" :to="{name: 'logout'}" exact>
                    <div class="tab">
                        Déconnexion
                    </div>
                </router-link>
            </nav>
            <nav id="smallmenu">
                <a id="openMenu" href="#smallmenu"><i class="material-icons">menu</i></a>
                <a id="closeMenu" href="#"><i class="material-icons">menu</i></a>
                <ul id="submenu">
                    <li>
                        <router-link :to="{name: 'help'}" exact>Aide</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'organization'}" exact>Organisation</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'challenges'}" exact>Défis</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'login'}" exact>Connexion</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'register'}" exact>Inscription</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'dashboard'}" exact>Tableau de bord</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'logout'}" exact>Déconnexion</router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
    import user from '../stores/UserStore';
    export default {
        data () {
            return {
                userState: user.state
            };
        },
        computed: {
            logged: function() {
                return this.userState.logged;
            }
        }
    };
</script>
