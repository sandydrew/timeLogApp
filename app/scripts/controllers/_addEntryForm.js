/**
 * Created by sdrew on 2/05/2014.
 */
'use strict';
angular.module('timeLogApp')
    .controller('addEntryFormCtrl', ['$scope', 'EntryActions', '$route', function($scope, entryActions, $route) {

        $scope.entries = $scope.$parent.entries;
        $scope.entry = entryActions.getBlankEntry();

        $scope.timeKeyPress = function ($event) {
            return entryActions.timeKeyPress($event, $scope.entries);
        };

        $scope.fieldsFilled = function () {
            return $scope.entry.startDate !== '' || $scope.entry.endDate !== '' || $scope.entry.projectCode !== '' || $scope.entry.description !== '';
        };

        $scope.setupDefault = function () {
            entryActions.setupDefaultEntry($scope);
        };

        $scope.timeBlurFormat = function ($event) {
            return entryActions.timeBlurFormat($event.currentTarget.value);
        };

        $scope.saveKeyPress = function ($event) {

            //enter - save if it's enter
            if ($event.keyCode !== 13) {
                return;
            }

            if (!$scope.addEntryForm.$valid) {
                return;
            }

            $scope.entry.entryDate = $scope.entryDate;
            entryActions.saveEntry($event, $scope.entry);
            $route.reload();
        };

    }])
    .directive('addEntryForm', function() {
        return { templateUrl: 'views/_addEntryForm.html' };
    });