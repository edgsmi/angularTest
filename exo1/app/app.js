(function() {
	'use strict';
	
	var countryHash = {
		'France': {
			wikipedia: 'https://fr.wikipedia.org/wiki/France',
			capital: 'Paris'
		},
		'Allemagne': {
			wikipedia: 'https://fr.wikipedia.org/wiki/Allemagne',
			capital: 'Berlin'
		},
		'Italie': {
			wikipedia: 'https://fr.wikipedia.org/wiki/Italie',
			capital: 'Rome'
		},
		'Espagne': {
			wikipedia: 'https://fr.wikipedia.org/wiki/Espagne',
			capital: 'Madrid'
		},
		'Suisse': {
			wikipedia: 'https://fr.wikipedia.org/wiki/Suisse',
			capital: 'Berne'
		},
		'USA': {
			wikipedia: 'https://fr.wikipedia.org/wiki/Suisse',
			capital: 'Washington DC'
		}
	};
	
	var countries2 = [
		{ name: 'FRANCE', title: 'France'},
		{ name: 'ALLEMAGNE', title: 'Allemagne'}
	];
	

	var app = angular.module('myApp', ['ngRoute', 'angucomplete-alt']);

	app.config(['$routeProvider', function($routeProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'tmpl/cover.html'
			})
			.when('/country/France', {
				templateUrl: 'country/france.html',
				controller: 'CountryController',
				controllerAs: 'ctrl'
			})
			.when('/country/:country', {
				templateUrl: 'country/country.html',
				controller: 'CountryController'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);

	app.run(['$rootScope', function($rootScope) {
		$rootScope.countries = Object.keys(countryHash);
		$rootScope.countryHash = countryHash;
		$rootScope.countries2 = countries2;
	}]);

	 app.controller('MainController', function($scope, $route, $routeParams, $location) {
	     $scope.$route = $route;
	     $scope.$location = $location;
	     $scope.$routeParams = $routeParams;
	 })


	app.controller('CountryController', ['$scope', '$routeParams', function($scope, $routeParams) {
		$scope.country = $routeParams.country;
		$scope.params = $routeParams;
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
