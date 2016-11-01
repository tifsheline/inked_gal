angular.module('inkedGal')
  .controller('MainController', MainController)
  .controller('LoginController', LoginController)
  .controller('LogoutController', LogoutController)
  .controller('RegisterController', RegisterController)

MainController.$inject = ['$rootScope', '$state', 'AuthService']
LoginController.$inject = ['$state', 'AuthService']
LogoutController.$iject = ['$state', 'AuthService']
RegisterController.$inject = ['$state', 'AuthService']

function MainController($rootScope, $state, AuthService) {
  var vm = this

  $rootScope.$on('$stateChangeStart', function(event) {
    console.log("Changing states")
    AuthService.getUserStatus()
      .then(function(data) {
        vm.currentUser = data.data.user
      })
    vm.$state = $state
  })

  vm.clearFilter = function() {
    vm.inkFilter = ''
  }
}

//Login Controller:
function loginController($state, AuthService) {
  var vm = this
  vm.login = function() {

    //initial values
    vm.error = false
    vm.disabled = true

    //call login from service
    AuthService.login(vm.loginForm.username, vm.loginForm.password)
    //handle success
      .then(function() {
        console.log("Successful login!")
        $state.go('profile')
        vm.disabled = false
        vm.loginForm = {}
      })
      //handle error
      .catch(function() {
        console.log("Oh no, something went wrong...")
        vm.error = true
        vm.errorMessage = "Invalid username and/or passord"
        vm.disabled = false
        vm.loginForm = {}
      })
  }
}

//Logout controller:
function logoutController($state, AuthService) {
  var vm = this
  vm.logout = function() {
    //call logout from services
    AuthService.logout()
      .then(function() {
        $state.go('login')
      })
  }
}

//Register Controller:
function registerController($state, AuthService) {
  var vm = this
  vm.register = function() {
    //initial values
    vm.error = false
    vm.disabled = true

    //call register from service
    AuthService.register(vm.registerForm.username, vm.registerForm.password)
    //handle success
      .then(function() {
        $state.go('profile')
        vm.disabled = false
        vm.regiesterForm = {}
      })
      //handle error
      .catch(function() {
        vm.error = true
        vm.errorMessage = "Yikes, something went wrong!"
        vm.disabled = false
        vm.registerForm = {}
      })
  }
}
