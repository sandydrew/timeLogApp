/**
 * Created by sdrew on 14/04/14.
 */
'use strict';

var services = angular.module('timeLogApp.services', ['ngResource']);

services.factory('Entry', ['$resource', function ($resource) {
    return $resource('api/entries/:startDate/:endDate', {startDate: '@startDate', endDate: '@endDate'});
}]);

services.factory('MultiEntryLoader', ['Entry', '$q',
    function (Entry, $q) {
        return function (startDateText, endDateText) {
            var delay = $q.defer();

            var startDate = [startDateText.getFullYear(), (startDateText.getMonth() + 1), startDateText.getDate()].join('-');
            var endDate = [endDateText.getFullYear(), (endDateText.getMonth() + 1), endDateText.getDate()].join('-');

            Entry.query({startDate: startDate, endDate: endDate}, function (entries) {
                    delay.resolve(entries);
                }, function () {
                    delay.reject('Unable to retrieve entries.');
                });

            return delay.promise;
        };
    }]);


services.factory('EntryLoader', ['Entry', '$route', '$q',
    function (Entry, $route, $q) {
        return function () {
            var delay = $q.defer();

            Entry.get({id: $route.current.params.entryId}, function (entry) {
                delay.resolve(entry);
            }, function () {
                delay.reject('Unable to retrieve entry ' + $route.current.params.entryId);
            });

            return delay.promise;
        };
    }]);
