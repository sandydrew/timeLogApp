/*global _:false */
/**
 * Created by sandy on 25/04/2014.
 */
'use strict';

angular.module('timeLogApp').factory('StatsFunctions', function () {

    var getHoursWorked = function (entries) {
        var minutes = 0;

        for (var entryIndex = 0; entryIndex < entries.length; entryIndex++) {
            minutes += getEntryMinutesWorked(entries[entryIndex]);
        }

        return minutes / 60;
    };

    var getEntryMinutesWorked = function (entry) {
        return (entry.endH * 60 + entry.endM) - (entry.startH * 60 + entry.startM);
    };

    var getProjectTotals = function (entries) {

        if(entries.length === 0) {
            return [];
        }

        var projects = _(entries).groupBy('projectCode');
        return _(projects).map(function (g, key) {
            return { projectCode: key,
                totalHours: _(g).reduce(function (m, x) {
                    return m + (getEntryMinutesWorked(x) / 60);
                }, 0) };
        });
    };

    return {
        getHoursWorked: getHoursWorked,
        getProjectTotals: getProjectTotals
    };
});