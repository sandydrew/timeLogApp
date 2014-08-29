/* global $:false */
/**
 * Created by sdrew on 2/05/2014.
 */
'use strict';

angular.module('timeLogApp')
    .controller('entriesViewCtrl', ['$scope', '$route', 'ModalDialog', 'EntryActions', 'TimeFunctions', function ($scope, $route, ModalDialog, entryActions, timeFunctions) {

        $scope.entries = $scope.$parent.entries;
        $scope.editEntry = [];
        $scope.entries.forEach(function (entry) {
            entry.startDate = timeFunctions.padNumber(entry.startH, 2) + ':' + timeFunctions.padNumber(entry.startM, 2);
            entry.endDate = timeFunctions.padNumber(entry.endH, 2) + ':' + timeFunctions.padNumber(entry.endM, 2);
        });

        $scope.timeBlurFormat = function ($event) {
            return entryActions.timeBlurFormat($event.currentTarget.value);
        };

        $scope.timeKeyPress = function ($event) {
            return entryActions.timeKeyPress($event, $scope.entries);
        };

        $scope.startEdit = function (editIndex) {
            clearEditEntries();
            $scope.editEntry[editIndex] = true;
        };

        var clearEditEntries = function () {
            for (var i = 0; i < $scope.editEntry.length; i++) {
                $scope.editEntry[i] = false;
            }
        };

        $scope.fieldsFilled = function (entryIndex) {
            return $scope.entries[entryIndex].startDate !== '' || $scope.entries[entryIndex].endDate !== '' || $scope.entries[entryIndex].projectCode !== '' || $scope.entries[entryIndex].description !== '';
        };

        $scope.editDeleteClick = function ($event) {
            if (ModalDialog.confirm('Are you sure you want to delete this entry?')) {
                entryActions.deleteEntry($event, $scope.entries);
                $route.reload();
            }
        };

        $scope.editCancelClick = function ($event) {
            if($($event.currentTarget.parentElement).find('input.ng-dirty').size() === 0) {
                //nothing changed, don't prompt.
                $route.reload();
                return;
            }

            if (ModalDialog.confirm('Are you sure? (Changes will be lost.)')) {
                $route.reload();
            }
        };

        $scope.editSaveClick = function ($event) {
            editSave($event);
        };

        $scope.editSaveKeyPress = function ($event) {

            //escape - cancel editing.
            if ($event.keyCode === 27) {
                if (ModalDialog.confirm('Are you sure? (Changes will be lost.)')) {
                    $route.reload();
                }
            }

            //enter - save if it's enter.
            if ($event.keyCode !== 13) {
                return;
            }

            editSave($event);
        };

        var editSave = function ($event) {
            var matches = $event.currentTarget.parentElement.id.match(/^.*(\d+)$/);
            var entry = $scope.entries[parseInt(matches[1], 10)];
            entry.entryDate = $scope.entryDate;
            entryActions.saveEntry($event, entry, function () {
                clearEditEntries();
                $route.reload();
            });

        };
    }])
    .directive('entriesView', function () {
        return { templateUrl: 'views/_entriesView.html' };
    });