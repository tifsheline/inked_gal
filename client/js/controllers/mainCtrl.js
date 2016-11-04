angular.module('inkedGal')
  .controller('mainController', mainController)
  .controller('loginController', loginController)
  .controller('logoutController', logoutController)
  .controller('registerController', registerController)

mainController.$inject = ['$rootScope', '$state', '$http', 'AuthService']
loginController.$inject = ['$state', 'AuthService']
logoutController.$inject = ['$state', 'AuthService']
registerController.$inject = ['$state', 'AuthService']

function mainController($rootScope, $state, $http, AuthService) {
  var vm = this

  vm.loggedIn = AuthService.isLoggedIn()

  vm.addImage = function(img) {
    console.log(img)
    console.log(img.images.low_resolution.url)
    var newInk = {
      url: img.images.low_resolution.url
    }
    $http.post('/user/users/' + vm.currentUser._id + '/inks', newInk)
      .then(function(data) {
        console.log(data)
        $state.go('inks')
      })
  }

  vm.deleteImage = function(obj) {
    console.log(vm.currentUser.inks[0].inksId);
      $http.delete('/inks/' + vm.currentUser._id + '/inks/' + inks.inksId)
        .then(function(data) {
          console.log(data)
          vm.image = data.data.image
        })
  }
  $rootScope.$on('$stateChangeStart', function(event) {
    console.log("Changing states")
    AuthService.getUserStatus()
      .then(function(data) {
        vm.currentUser = data.data.user
        console.log(vm.currentUser)
        if(vm.currentUser) {          $http.get('/user/instagram-media?instagram='
      + vm.currentUser.instagram)
          .success(function(data) {
            console.log(data)
            vm.currentUser.photos = data.items
            })
          }
        })
      })
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
        vm.errorMessage = "Invalid username and/or password"
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
    AuthService.register(vm.registerForm.username, vm.registerForm.password, vm.registerForm.instagram)
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
