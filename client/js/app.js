var inkedGal = angular.module('inkedGal', ['ui.router'])

inkedGal.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', router])

inkedGal.directive('navigationBar', navigationBar)

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
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginController as loginCtrl'
    })
    .state('logout', {
      url: '/logout',
      controller: 'logoutController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'registerController as registerCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/profile.html',
      restricted: true
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

function navigationBar() {
  return{
    restrict: 'E',
    templateUrl: 'partials/nav.html'
  }
}

inkedGal.run(function($rootScope, $location, $state, AuthService) {
  $rootScope.$on("stateChangeError", console.log.bind(console));
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    AuthService.getUserStatus()
      .then(function() {
        console.log(toState)
        if(toState.restricted && !AuthService.isLoggedIn()) {
          $state.go('login');
        }
      })
  })
})
