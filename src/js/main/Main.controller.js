angular.module('app')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['MainService','APP_DATA'];

function MainCtrl(MainService, APP_DATA) {
	var $ctrl    = this;
	$ctrl.people = [];

	$ctrl.appName = function() {
		return APP_DATA.APP_NAME;
	};

	$ctrl.hobbies = [
		'Baseball',
		'Football',
		'Baseketball',
		'Hockey',
		"Lacrosse",
		"Volleyball",
		"Softball",
		"Skateboarding"
	];

	$ctrl.updateFullName = function($index) {
		var person = this.people[$index];
		person.fullname = person.fname + ' ' + person.lname;
	};

	$ctrl.updateHobbies = function($index) {
		var person = this.people[$index];
		person.hobbies = person.hobbyList.join(',');
	};
	
	function getPeople() {
		MainService.getPeople()
			.then(function (people) {
				$ctrl.people = people;
			});
	}

	// load people data from server
	getPeople();

}



