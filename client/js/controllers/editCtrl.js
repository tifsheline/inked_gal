angular.module('inkedGal')
  .controller('EditInkController', EditInkController)

EditInkController.$inject = ['$stateParams', '$state', 'InkFactory']

function EditInkController($stateParams, $state, InkFactory) {
  var vm = this

  InkFactory.show($stateParams.id)
    .success(function(data) {
      vm.ink = data
    })

  vm.editInk = function() {
    console.log(vm.ink)
    InkFactory.update($stateParams.id, vm.ink)
      .success(function(data) {
        console.log(data)
        $state.go('ink', {id: $stateParams.id})
      })
  }
}
