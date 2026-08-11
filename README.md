# LivAndCo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.20.

LivAndCo est une application web de gestion et de réservation dédiée au coliving. Elle permet aux utilisateurs de rechercher des logements, de consulter leurs disponibilités et d'effectuer des réservations.

L'application propose également un espace dédié aux propriétaires pour gérer leurs logements et leurs réservations, ainsi qu'une interface d'administration permettant de superviser l'ensemble de la plateforme.

Le projet a été développé dans le cadre de ma formation de **Développeur Web et Web Mobile**, avec une architecture séparant le frontend et l'API.

### Fonctionnalités principales

* Recherche et consultation des logements
* Affichage des logements sur une carte
* Gestion des disponibilités et réservations
* Gestion des logements côté propriétaire
* Messagerie entre utilisateurs
* Calendrier des réservations
* Interface d'administration
* API REST

### Technologies utilisées

* **Backend :** Symfony 6.4, API Platform, Doctrine ORM
* **Frontend :** Angular 18, Tailwind CSS
* **Base de données :** MySQL
* **Cartographie :** MapLibre
* **Administration :** EasyAdmin


## Application Structure

```text

├─ .vscode/
├─ public/
│  ├─ icons/
│  └─ uploads/
└─ src/
   ├─ app/
   │  ├─ components/
   │  │  ├─ pages/
   │  │  │  ├─ home/
   │  │  │  ├─ contact/
   │  │  │  ├─ help/
   │  │  │  ├─ login/
   │  │  │  ├─ register/
   │  │  │  ├─ announcement-list/
   │  │  │  ├─ announcement-detail/
   │  │  │  ├─ reservation/
   │  │  │  └─ profile/
   │  │  │     ├─ profile-shell/
   │  │  │     ├─ messages/       
   │  │  │     ├─ reservations/
   │  │  │     ├─ general/      
   │  │  │     └─ dashboard-owner/
   │  │  │  │    ├─ accomodations/
   │  │  │  │    ├─ announcements/       
   │  │  │  │    ├─ rental-requests/
   │  │  │  │    ├─ add-accomodation/      
   │  │  │  │    └─ add-announcement/
   │  │  ├─ layout/
   │  │  │  ├─ nav-bar/
   │  │  │  ├─ footer/
   │  │  │  └─ profile/
   │  │  │     ├─ nav-bar-secondary/
   │  │  │     └─ panels/
   │  │  │        ├─ messages-panel/
   │  │  │        ├─ reservations-panel/
   │  │  │        ├─ owner-dasboard-panel/
   │  │  │        └─ profile-panel/
   │  │  └─ common/
   │  │     ├─ announcement-list-card/
   │  │     ├─ results-map/
   │  │     ├─ loading/
   │  │     ├─ errors/
   │  │     │  └─ form-control-error/
   │  │     └─ forms/
   │  ├─ services/
   │  │  ├─ announcement/
   │  │  ├─ reservation/
   │  │  ├─ message/
   │  │  └─ user/
   │  ├─ models/
   │  ├─ guards/
   │  ├─ interceptors/
   │  ├─ pipes/
   │  └─ utils/
   └─ 

```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
