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
		$rootScope.countries = countries;
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
	
	app.run(['$rootScope', function($rootScope) {
		$rootScope.countries = countries;
		$rootScope.countries2 = countries2;
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
