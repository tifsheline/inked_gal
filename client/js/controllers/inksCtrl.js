angular.module('inkedGal')
  .controller('InksController', InksController)

InksController.$inject = ['$scope', '$state', 'InkFactory']

function InksController($scope, $state, InkFactory) {
  var vm = this

  //get all inks when controller loads:
  InkFactory.index()
    .success(function(data) {
      vm.inks = data
    })

  //invoke InkFactory destroy method based on ID:
  vm.destroyInk = function(ink, index) {
    InkFactory.destroy(ink._id)
      .success(function(data) {
        console.log(data)
        //when confirmed that its gone from database, find matching ink in array and remove it:
        vm.inks.splice(index, 1)
      })
  }
}
