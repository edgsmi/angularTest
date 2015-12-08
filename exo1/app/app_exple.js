(function() {
	'use strict';
	
	var countries = [
		'France',
		'Allemagne',
		'Italie',
		'Espagne',
		'Suisse',
		'France',
		'USA'
	];
	
	var countries2 = [
		{ name: 'FRANCE', title: 'France'},
		{ name: 'ALLEMAGNE', title: 'Allemagne'}
	];
	

	var app = angular.module('myApp', ['angucomplete-alt', 'ngRoute']);
	
	app.config(['$routeProvider', function($routeProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'tmpl/cover.html'
			})
			.when('/country/:country', {
				templateUrl: 'tmpl/country.html',
				controller: 'CountryController',
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);
	app.run(['$rootScope', function($rootScope) {
		$rootScope.countries = countries;
		$rootScope.countries2 = countries2;
	}]);
	
	app.controller('CountryController', ['$scope', '$routeParams', function($scope, $routeParams) {
		$scope.country = $routeParams.country;
	}]);

	app.directive('xxHeader', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/header.html',
			transclude: true
		};
	});
	
	app.directive('xxBody', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/body.html',
			transclude: true
		};
	});
	
	app.directive('xxFooter', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/footer.html',
			transclude: true
		};
	});

})();
