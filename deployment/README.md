# Déploiement Docker

## Introduction

Nous avons mis une installation assez facile en utilisant le système Docker.

## Pré-requis

- Vous avez juste besoin de la dernière version de Docker Engine, la procédure est disponible à [cette adresse](https://docs.docker.com/engine/installation/).
- Vous avez besoin d'une base de donnée MongoDB. Vous pouvez aussi la déployer avec Docker en utilisant [cette image](https://hub.docker.com/_/mongo/).

## Déploiement

### Génération du Dockerfile

Le Dockerfile est un fichier qui permet de construire l'image Docker pour le générer, vous devez exécuter la commande suivante

```
./launcher.sh generate
```

Le ficher **Dockerfile** généré se trouve dans le dossier *deployment*. Éditez les variables d'environnement selon vos besoins (les commentaires vous guideront).

### Création de l'image

```
./launcher.sh build
```

Cette commande doit être exécutée à chaque fois que le Dockerfile est modifié.

### Lancement du conteneur

```
./launcher.sh run [port]
```

Voius pouver utiliser la variable **port** d'écoute du serveur HTTP. Par défaut, c'est le port 8080