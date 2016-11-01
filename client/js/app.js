angular.module('inkedGal', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', router])

function router($stateProvider, $urlRouterProvider, $locationProvider) {
  //remove '/#/' from url:
  $locationProvider.html5Mode(true)

  // Routes:
  $urlRouterProvider.otherwise('/')
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html'
    })
    .state('inks', {
      url: '/inks',
      templateUrl: 'templates/inks.html',
      // controller: 'InksController as ic'
    })
    .state('ink', {
      url: '/inks/:id',
      templateUrl: 'templates/ink.html',
      // controller: 'SingleInkController as sic'
    })
    .state('create', {
      url: '/inks/new',
      templateUrl: 'templates/new.html',
      // controller: 'NewInkController as nic'
    })
    .state('edit', {
      url: '/inks/:id/edit',
      templateUrl: 'templates/update.html',
      // controller: 'EditInkController as eic'
    })
}
