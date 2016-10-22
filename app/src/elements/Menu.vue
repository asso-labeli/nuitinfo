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
                <a href="/sponsors" class="">
                    <div class="tab">
                        Partenaires
                    </div>
                </a>
                <a href="/challenges" class="">
                    <div class="tab">
                        Défis
                    </div>
                </a>
                <a href="/flux" class="">
                    <div class="tab">
                        Flux
                    </div>
                </a>
                <router-link :to="{name: 'login'}" exact>
                    <div class="tab">
                        Connexion
                    </div>
                </router-link>
            </nav>
            <nav id="smallmenu">
                <a id="openMenu" href="#smallmenu"><i class="material-icons">menu</i></a>
                <a id="closeMenu" href="#"><i class="material-icons">menu</i></a>
                <ul id="submenu">
                    <li><a href="/help">Help</a></li>
                    <li><a href="/sponsors">Partenaires</a></li>
                    <li><a href="/challenges">Défis</a></li>
                    <li><a href="/flux">Flux</a></li>
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
