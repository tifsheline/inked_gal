angular.module('inkedGal')
  .factory('InkFactory', ['$http', InkFactory])

function InkFactory($http) {
  return {
    index: index,
    show: show,
    destroy: destroy,
    create: create,
    update: update
  }

  function index() {
    return $http.get('/api/inks')
  }

  function show(id) {
    return $http.get('/api/inks' + id)
  }

  function destroy(id) {
    return $http.delete('/api/inks/' + id)
  }

  function create(ink) {
    return $http.post('/api/inks/', ink)
  }

  function update(id, data) {
    return $http.patch('/api/inks' + id, data)
  }
}
