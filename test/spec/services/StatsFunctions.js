/**
 * Created by sdrew on 25/04/2014.
 */
'use strict';

describe('Service: TimeFunctions', function () {

    // load the service's module
    beforeEach(module('timeLogApp'));

    var timeFns, statsFns;
    var entries;

    beforeEach(inject(function (TimeFunctions, StatsFunctions, EntriesMock) {
        timeFns = TimeFunctions;
        statsFns = StatsFunctions;
        entries = new EntriesMock();
    }));

    //hours worked
    it('should get the correct number of hours worked for a collection of entries', function () {
        expect(statsFns.getHoursWorked(entries)).toEqual(2.5);
    });

    it('should correctly return zero hours worked if there are no entries', function () {
        expect(statsFns.getHoursWorked([])).toEqual(0);
    });

    //project totals
    it('should return a list hours grouped by project', function () {
        var summary = statsFns.getProjectTotals(entries);

        expect(summary.length).toEqual(2);
        expect(summary[0].projectCode).toEqual('CSU0071');
        expect(summary[0].totalHours).toEqual(0.5);
        expect(summary[1].projectCode).toEqual('CSU0072');
        expect(summary[1].totalHours).toEqual(2);
    });

    it('should return an empty array if there are no entries', function () {
        var summary = statsFns.getProjectTotals([]);
        expect(summary.length).toEqual(0);
    });
});