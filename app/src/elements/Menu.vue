<template>
    <header>
        <div class="content">
            <a href="/" id="home" class=" active"></a>
            <nav id="menu">
                <a href="http://149.202.164.166/" class="" id="forum">
                    <div class="tab">
                        Forum
                    </div>
                </a>
                <a href="http://nuitinfo.labeli.org/sponsors" class="">
                    <div class="tab">
                        Partenaires
                    </div>
                </a>
                <a href="/challenges" class="">
                    <div class="tab">
                        Défis
                    </div>
                </a>
                <a href="http://nuitinfo.labeli.org/flux" class="">
                    <div class="tab">
                        Flux
                    </div>
                </a>
                <a href="/login" class="">
                    <div class="tab">
                        Connexion
                    </div>
                </a>
            </nav>
            <nav id="smallmenu">
                <a id="openMenu" href="#smallmenu"><i class="material-icons">menu</i></a>
                <a id="closeMenu" href="#"><i class="material-icons">menu</i></a>
                <ul id="submenu">
                    <li><a href="http://149.202.164.166/">Forum</a></li>
                    <li><a href="http://nuitinfo.labeli.org/sponsors">Partenaires</a></li>
                    <li><a href="/challenges">Défis</a></li>
                    <li><a href="http://nuitinfo.labeli.org/flux">Flux</a></li>
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

<style scoped>
    header {
        background: rgb(9, 31, 41);
    }

    #menu a {
        color: white;
    }

    #menu a {
        margin-top: 8px;
        height: 50px;
        padding: 0 2em;
        border-right: 1px solid black;
    }

    #menu a:hover {
        background: rgba(0, 0, 0, 0.33);
    }

    #menu a .tab {
        display: block;
        padding: 0;
        margin: 0;
        margin-top: 14px;
    }

    @media screen and (min-width: 700px) {
        a#home:hover {
            background: rgba(0, 0, 0, 0.25);
        }

        header .content {
            max-width: 1200px;
            text-align: right;
            margin: auto;
            background-image: url('./assets/favicon.png');
            background-repeat: no-repeat;
            background-position: 0 50%;
        }

        header #home {
            float: left;
            display: inline-block;
            height: 58px;
            width: 64px;
        }

        header .button {
            margin: 10px;
        }

        header .button:last-child {
            margin-right: 0;
        }

        nav#menu {
            display: flex;
            justify-content: flex-end;
        }

        nav#smallmenu {
            display: none;
        }

        header a#home.active, nav#menu a.active {
            border-left: 2px solid #0056AB;
            background: rgba(33, 143, 193, 0.26);
        }
    }
</style>