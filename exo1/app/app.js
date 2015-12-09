(function() {
	'use strict';
	
	
	var countries2 = [
		{ name: 'FRANCE', title: 'France'},
		{ name: 'ALLEMAGNE', title: 'Allemagne'}
	];
	

	var app = angular.module('myApp', ['ngRoute', 'angucomplete-alt', 'ngResource']);

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


/*	app.run(['$rootScope', '$resource', function($rootScope, $resource) {
		//$rootScope.countryHash = countryHash;
		$rootScope.countryHash = $resource('country.json').get();
		$rootScope.$watch('countryHash', function() {
			$rootScope.countries = Object.keys($rootScope.countryHash)
			.filter(function(n) {
				return !(n == '$promise' || n == '$resolved');
			});
		}, true);
		$rootScope.countries2 = countries2;
	}]);
*/
/*	app.run(['$rootScope', '$resource', function($rootScope, $resource) {
		$rootScope.countryHash = '';
		$resource('country.json').get()
		.$promise.then(function(result) {
     		$rootScope.countryHash = result['country'];
   		 });
		$rootScope.$watch('countryHash', function() {
			$rootScope.countries = Object.keys($rootScope.countryHash);
		}, true);
		$rootScope.countries2 = countries2;
	}]);*/

/*	app.run(['$rootScope', '$resource', '$http', function($rootScope, $resource, $http) {
		$http.get('country.json').then(function(response) {
			$rootScope.countryHash = response.data;
			$rootScope.$watch('countryHash', function() {
				$rootScope.countries = Object.keys($rootScope.countryHash);
			});
		}).catch(function(error) {
			$rootScope.countryHash = '';
			$rootScope.countries = '';
			console.log('Error', error);
		});
		$rootScope.countries2 = countries2;
	}]);*/

	app.run(['$rootScope', '$resource', '$http', '$q', function($rootScope, $resource, $http, $q) {
		$http.get('country.json').then(function(response) {
			$rootScope.countryHash = response.data;
			$rootScope.countries = Object.keys($rootScope.countryHash);		
			var array = [];
			for (var country in $rootScope.countryHash) {
				if($rootScope.countryHash[country].capital === undefined) {
					/*var promise = $http.get(country.toLowerCase() + '.json');*/
					var promise = $http({
						country: country,
						url: country.toLowerCase() + '.json',
						method: 'GET'
					})
					//promise.country = country;
					array.push(promise);
				}
			}
			return $q.all(array)
		}).then(function(responses) {
			console.log('all done', arguments);
			responses.forEach(function(n) {
				$rootScope.countryHash[n.config.country] = n.data;
			})
			/*for (var i = 0; i < responses.length; i++) {
				$rootScope.countryHash[responses[i].config.country] = responses[i].data;
			}*/
		}).catch(function(error) {
			console.log('Error', error);
		});
		/*$rootScope.$watch('countryHash', function() {
			$rootScope.countries = Object.keys($rootScope.countryHash);
		});*/
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
