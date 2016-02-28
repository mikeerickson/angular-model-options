angular.module('app')
	.factory('MainService', MainService);

MainService.$inject = ['$http','$q','APP_DATA'];

function MainService($http, $q, APP_DATA) {

	console.log(APP_DATA.APP_NAME);
	// public methods and variables
	var service = {
		getPeople: getPeople
	}

	// return service entry points
	return service;

	/** Service Methods **/

	function getPeople() {
		return $http.get(APP_DATA.API_BASE_URL + '/people')
			.then(function (response) {
				response.data.forEach(function(item){
					item.fullname  = item.fname + ' ' + item.lname;
					item.hobbyList = item.hobbies.split(/[ ,]+/);
					return item
				});
				return response.data;
			})
			.catch(function (error) {
				return $q.reject(error.data);
			});
	}


}



