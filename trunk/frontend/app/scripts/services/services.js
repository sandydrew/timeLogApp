/**
 * Created by sdrew on 14/04/14.
 */
'use strict';

var services = angular.module('timeLogApp.services', ['ngResource']);

services.factory('Entry', ['$resource', function ($resource) {
    return $resource('api/entries/:logDate', {logDate: '@logDate'});
}]);

services.factory('MultiEntryLoader', ['Entry', '$q',
    function (Entry, $q) {
        return function (logDate) {
            var delay = $q.defer();

            var queryDate = [logDate.getYear() + 1900, (logDate.getMonth() + 1), logDate.getDate()].join('-');

            Entry.query({logDate: queryDate}, function (entries) {
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
