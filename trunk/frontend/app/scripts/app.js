'use strict';

angular.module('timeLogApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'timeLogApp.services',
        'ui.calendar'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/date/:entryDate', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                resolve: {
                    entries: ['$route', 'MultiEntryLoader', 'TimeFunctions', function($route, MultiEntryLoader, TimeFunctions) {
                        return new MultiEntryLoader(TimeFunctions.parseYMD($route.current.params.entryDate));
                    }]
                }
            })
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                resolve: {
                    entries: ['MultiEntryLoader', 'TimeFunctions', function(MultiEntryLoader, TimeFunctions) {
                        return new MultiEntryLoader(TimeFunctions.getCurrentDate());
                    }]
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    });
