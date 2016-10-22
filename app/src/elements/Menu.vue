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
                <router-link :to="{name: 'sponsorship'}" exact>
                    <div class="tab">
                        Partenaires
                    </div>
                </router-link>
                <router-link :to="{name: 'challenges'}" exact>
                    <div class="tab">
                        Défis
                    </div>
                </router-link>
                <router-link :to="{name: 'login'}" exact>
                    <div class="tab">
                        Connexion
                    </div>
                </router-link>
                <router-link :to="{name: 'register'}" exact>
                    <div class="tab">
                        Inscription
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
                        <router-link :to="{name: 'sponsorship'}" exact>Partenaires</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'challenges'}" exact>Défis</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'login'}" exact>Connexion</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'register'}" exact>Login</router-link>
                    </li>
                    <li><a href="/login">Connexion</a></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
    export default {
        data () {
            return {};
        }
    };
</script>
