/*global _:false */
'use strict';

angular.module('timeLogApp')
    .controller('MainCtrl', ['$scope', '$routeParams', 'TimeFunctions', 'StatsFunctions', 'entries',
        function ($scope, $routeParams, timeFunctions, statsFunctions, entries) {

            $scope.entryDate = $routeParams.entryDate !== undefined ? timeFunctions.parseYMD($routeParams.entryDate) : timeFunctions.getCurrentDate();
            $scope.weekEntries = [];

            for(var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                entry.entryDate = new Date(entry.entryDate);
                $scope.weekEntries.push(entry);
            }

            $scope.entries = _.filter($scope.weekEntries, function(entry) {
                return entry.entryDate.getDate() === $scope.entryDate.getDate(); //can cheat here and just check the day.
            });

            var startDate = new Date($scope.entryDate.getTime());
            startDate.setDate($scope.entryDate.getDate() - ($scope.entryDate.getDay() - 1));
            var endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            endDate.setDate(startDate.getDate() + 7);

            $scope.projectTotals = statsFunctions.getProjectTotals($scope.entries);

            $scope.getHoursWorked = function () {
                return statsFunctions.getHoursWorked($scope.entries);
            };

            $scope.getTotalThisWeek = function() {
                return statsFunctions.getHoursWorked($scope.weekEntries);
            };

        }]);
