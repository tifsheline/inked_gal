angular.module('inkedGal')
  .controller('SingleInkController', SingleInkController)

SingleInkController.$inject = ['$stateParams', '$state', 'InkFactory']

function SingleInkController($stateParams, $state, InkFactory) {
  var vm = this

  InkFactory.show($stateParams.id)
    .success(function(ink) {
      vm.ink = ink
      console.log(vm.ink)
    })

  vm.destroyInk = function() {
    InkFactory.detroy(vm.ink._id)
      .success(function(data) {
        $state.go('inks')
      })
  }
}
