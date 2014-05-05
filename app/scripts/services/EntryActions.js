/**
 * Created by sdrew on 16/04/2014.
 */
'use strict';

angular.module('timeLogApp').factory('EntryActions', ['TimeFunctions', 'MultiEntryLoader', 'Entry', function (timeFunctions, MultiEntryLoader, Entry) {

    var setupDefaultEntry = function ($scope) {
        if ($scope.entry.startDate !== '' || $scope.entry.endDate !== '' || $scope.entry.projectCode !== '' || $scope.entry.description !== '') {
            return;
        }

        //if there's an existing entry for this day, set the new one to start when it ends.
        //if there are no entries for this day, set the new one to start now.
        $scope.entry.startDate = $scope.entries.length > 0 ?
            timeFunctions.padNumber($scope.entries[$scope.entries.length - 1].endH, 2) + ':' + timeFunctions.padNumber($scope.entries[$scope.entries.length - 1].endM, 2) :
            timeFunctions.getPaddedTime(timeFunctions.getCurrentDate(), true);

        $scope.entry.endDate = timeFunctions.timeIsLessThanOrEqual(timeFunctions.getPaddedTime(timeFunctions.getCurrentDate(), true), $scope.entry.startDate) ?
            timeFunctions.addToPaddedTime($scope.entry.startDate, 0, 15) :
            timeFunctions.getPaddedTime(timeFunctions.getCurrentDate(), true);
    };

    var getBlankEntry = function () {
        return {entryId: 0, startDate: '', endDate: '', projectCode: '', description: ''};
    };

    var timeBlurFormat = function (value) {

        if (value.length === 0) {
            return value;
        }

        var matches = value.match(/(\d{2}):(\d{2})/);

        if (matches !== null && matches.length === 3) {
            return matches[1] + ':' + timeFunctions.padNumber(timeFunctions.roundMinutes(parseInt(matches[2], 10)), 2);
        }

        if (value.length === 2) {
            return timeFunctions.padNumber(parseInt(value, 10), 2) + ':00';
        }

        var timeSplit = value.split(':');

        if (timeSplit.length === 1) {

            if (value.length === 4) {
                return timeFunctions.padNumber(parseInt(value.substring(2, 0), 10), 2) + ':' + timeFunctions.padNumber(timeFunctions.roundMinutes(parseInt(value.substring(2), 10)), 2);
            }

            if (value.length === 3) {
                return timeFunctions.padNumber(parseInt(value.substring(1, 0), 10), 2) + ':' + timeFunctions.padNumber(timeFunctions.roundMinutes(parseInt(value.substring(1), 10)), 2);
            }


            return timeFunctions.padNumber(parseInt(timeSplit[0], 10), 2) + ':00';
        }

        return timeFunctions.padNumber(parseInt(timeSplit[0], 10), 2) + ':' + timeFunctions.padNumber(timeFunctions.roundMinutes(parseInt(timeSplit[1], 10)), 2);

    };

    var getTimeKeyPressValue = function (event, entries) {
        if (event.ctrlKey && event.shiftKey && event.keyCode === 32) {
            //ctrl + shift + space
            if (entries.length === 0) {
                return '';
            }
            return entries[entries.length - 1].endH + ':' + entries[entries.length - 1].endM;
        }

        if (event.ctrlKey && event.keyCode === 32) {
            //ctrl + space
            return timeFunctions.getPaddedTime(timeFunctions.getCurrentDate(), true);
        }

        var oldVal = event.currentTarget.value;

        if (oldVal === '') {
            return '';
        }

        if (event.keyCode === 38) {
            //up
            if (event.shiftKey) {
                return timeFunctions.addToPaddedTime(oldVal, 1, 0);
            }

            return timeFunctions.addToPaddedTime(oldVal, 0, 15);
        }

        if (event.keyCode === 40) {
            //down
            if (event.shiftKey) {
                return timeFunctions.addToPaddedTime(oldVal, -1, 0);
            }

            return timeFunctions.addToPaddedTime(oldVal, 0, -15);
        }

        return '';
    };

    var timeKeyPress = function (event, entries) {

        var newValue = getTimeKeyPressValue(event, entries);

        if (newValue === '') {
            return event.currentTarget.value;
        }

        event.preventDefault();
        event.currentTarget.value = newValue;
        return newValue;
    };

    var saveEntry = function ($event, entry) {

        var splitStartTime = entry.startDate.split(':');
        var splitEndTime = entry.endDate.split(':');

        var writableEntry = {
            entryId: entry.entryId,
            entryDate: entry.entryDate,
            startH: splitStartTime[0],
            startM: splitStartTime[1],
            endH: splitEndTime[0],
            endM: splitEndTime[1],
            projectCode: entry.projectCode,
            description: entry.description
        };

        Entry.save(writableEntry);
    };

    var deleteEntry = function ($event, entries) {
        var matches = $event.currentTarget.parentElement.id.match(/^.*(\d+)$/);
        Entry.delete({entryId: entries[parseInt(matches[1], 10)].entryId});
    };

    var test = {
        getTimeKeyPressValue: getTimeKeyPressValue
    };

    return {
        timeKeyPress: timeKeyPress,
        setupDefaultEntry: setupDefaultEntry,
        getBlankEntry: getBlankEntry,
        timeBlurFormat: timeBlurFormat,
        saveEntry: saveEntry,
        deleteEntry: deleteEntry,
        test: test
    };

}]);

angular.module('timeLogApp').filter('PadNumber', ['TimeFunctions', function (timeFunctions) {
    return function (n, places) {
        return timeFunctions.padNumber(n, places);
    };
}]);