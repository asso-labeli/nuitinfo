<template>
    <footer>
        <div class="content">
            <div id="labeli">Site d'inscription créé par l'association <a href="http://www.labeli.org"
                                                                          target="_blank">Label[i]</a> - Support :
                <a href="https://twitter.com/NuitInfoUBX" target="_blank">@NuitInfoUBX</a> / <a
                        href="mailto:nuitinfo@labeli.org">nuitinfo@labeli.org</a></div>
            <div class="credits">
                En partenariat avec :
                <div id="labri"><a
                        href="http://www.u-bordeaux.fr/Colleges-et-departements/College-Sciences-et-technologies/Unite-de-formation-d-informatique"
                        target="_blank">UF Info</a></div>
                <div id="cremi"><a href="http://www.emi.u-bordeaux.fr/" target="_blank">CREMI</a></div>
                <div id="fsdie"><a href="http://www.u-bordeaux.fr/" target="_blank">Université de Bordeaux</a></div>
                <div id="cgi"><a href="http://www.cgi-recrute.fr/" target="_blank">CGI</a></div>
                <div id="ovh"><a href="https://www.ovh.com/" target="_blank">OVH</a></div>
                <div id="iut"><a href="http://www.iut.u-bordeaux.fr/general/" target="_blank">IUT Bordeaux</a></div>
            </div>
        </div>
    </footer>
</template>


<style scoped>
    footer {
        background: rgb(9, 31, 41);
    }

    @media screen and (min-width: 700px) {
        footer {
            padding: 10px;
        }

        footer .content {
            max-width: 1200px;
            margin: auto;
        }

        footer .credits div:first-child {
            margin-left: 25px;
        }

        footer .credits div {
            margin-right: 25px;
            display: inline;
        }
    }

    @media screen and (max-width: 700px) {
        footer {
            padding: 1%;
            /*background-color : rgba(0,0,0,0.5);*/
            border-top: 2px solid rgba(0, 0, 0, 0.75);
        }

        footer .content {
            max-width: 90%;
            margin: auto;
        }

        footer .credits div:first-child {
            margin-left: 25px;
        }

        footer .credits div {
            text-align: center;
            margin-right: 25px;
            display: inline-block;
        }
    }
</style>