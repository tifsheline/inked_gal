angular.module('inkedGal')
  .controller('NewInkController', NewInkController)

NewInkController.$inject = ['$scope', '$state', 'InkFactory']

function NewInkController($scope, $state, InkFactory) {
  var vm = this

  vm.createInk = function() {
    console.log(vm.newInk)
    InkFactory.create(vm.newInk)
      .success(function(data) {
        console.log(data)
        $state.go('ink')
      })
  }
}
