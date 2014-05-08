'use strict';

angular.module('timeLogApp')
    .controller('MainCtrl', ['$scope', '$routeParams', 'TimeFunctions', 'StatsFunctions', 'entries',
        function ($scope, $routeParams, timeFunctions, statsFunctions, entries) {

            $scope.entries = entries;

            $scope.entryDate = $routeParams.entryDate !== undefined ? timeFunctions.parseYMD($routeParams.entryDate) : timeFunctions.getCurrentDate();

            $scope.projectTotals = statsFunctions.getProjectTotals(entries);

            $scope.getHoursWorked = function () {
                return statsFunctions.getHoursWorked(entries);
            };

        }]);
