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
                        var startDate = TimeFunctions.parseYMD($route.current.params.entryDate);
                        startDate.setDate(startDate.getDate() - ((startDate.getDay() === 0 ? 7 : startDate.getDay()) - 1));
                        var endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                        endDate.setDate(startDate.getDate() + 7);
                        return new MultiEntryLoader(startDate, endDate);
                    }]
                }
            })
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                resolve: {
                    entries: ['MultiEntryLoader', 'TimeFunctions', function(MultiEntryLoader, TimeFunctions) {
                        var startDate = TimeFunctions.getCurrentDate();
                        startDate.setDate(startDate.getDate() - ((startDate.getDay() === 0 ? 7 : startDate.getDay()) - 1));
                        var endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                        endDate.setDate(startDate.getDate() + 7);
                        return new MultiEntryLoader(startDate, endDate);
                    }]
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    });
