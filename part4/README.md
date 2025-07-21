## Partie 4 - Client Web Simple
Dans cette phase, on se concentre sur le développement front-end de l'application en utilisant HTML5, CSS3 et JavaScript ES6. La tâche est de concevoir et d’implémenter une interface utilisateur interactive qui se connecte aux services back-end que tu as développés dans les parties précédentes du projet.

# Objectifs

- Développer une interface conviviale en suivant les spécifications de design fournies.
- Implémenter des fonctionnalités côté client pour interagir avec l’API back-end.
- Assurer une gestion sécurisée et efficace des données en utilisant JavaScript.
- Appliquer des pratiques modernes de développement web pour créer une application web dynamique.

# Objectifs pédagogiques

- Comprendre et appliquer HTML5, CSS3 et JavaScript ES6 dans un projet réel.
- Apprendre à interagir avec des services back-end en utilisant AJAX/Fetch API.
- Implémenter des mécanismes d’authentification et gérer les sessions utilisateur.
- Utiliser le scripting côté client pour améliorer l’expérience utilisateur sans rechargement de page.

# Répartition des tâches

# Design (Tâche 1)

- Compléter les fichiers HTML et CSS fournis pour correspondre aux spécifications de design données.
- Créer les pages pour la connexion, la liste des lieux, les détails d’un lieu et l’ajout d’un avis.

# Connexion (Tâche 2)

- Implémenter la fonctionnalité de connexion en utilisant l’API back-end.
- Stocker le token JWT retourné par l’API dans un cookie pour gérer la session.

# Liste des lieux (Tâche 3)

- Implémenter la page principale affichant la liste de tous les lieux.
- Récupérer les données des lieux via l’API et permettre un filtrage côté client basé sur la sélection du pays.
- S’assurer que la page redirige vers la page de connexion si l’utilisateur n’est pas authentifié.

# Détails d’un lieu (Tâche 4)

- Implémenter la vue détaillée d’un lieu.
- Récupérer les détails du lieu via l’API en utilisant l’ID du lieu.
- Permettre l’accès au formulaire d’ajout d’avis si l’utilisateur est authentifié.

# Ajout d’avis (Tâche 5)

- Implémenter le formulaire pour ajouter un avis sur un lieu.
- Veiller à ce que le formulaire soit accessible uniquement aux utilisateurs authentifiés, en redirigeant les autres vers la page d’accueil.