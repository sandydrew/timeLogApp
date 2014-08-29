/**
 * Created by sdrew on 16/04/2014.
 */
'use strict';

describe('Service: TimeFunctions', function () {

    // load the service's module
    beforeEach(module('timeLogApp'));

    var timeFns;

    beforeEach(inject(function (TimeFunctions) {
        timeFns = TimeFunctions;
    }));

    //padNumber
    it('should correctly pad a single digit number', function () {
        expect(timeFns.padNumber(4, 2)).toEqual('04');
    });

    it('should correctly pad a double digit number', function () {
        expect(timeFns.padNumber(17, 2)).toEqual('17');
    });

    //getCurrentDate
    it('should return a valid date if the currentdate has not been set', function() {
        timeFns.test.setCurrentDate(null);
        expect(timeFns.getCurrentDate()).not.toBeNull();
    });

    //roundMinutes
    it('should round a time to the nearest 15 minutes (1)', function () {
        expect(timeFns.roundMinutes(0)).toEqual(0);
    });

    it('should round a time to the nearest 15 minutes (2)', function () {
        expect(timeFns.roundMinutes(15)).toEqual(15);
    });

    it('should round a time to the nearest 15 minutes (3)', function () {
        expect(timeFns.roundMinutes(7)).toEqual(0);
    });

    it('should round a time to the nearest 15 minutes (4)', function () {
        expect(timeFns.roundMinutes(8)).toEqual(15);
    });

    it('should round a time to the nearest 15 minutes (5)', function () {
        expect(timeFns.roundMinutes(55)).toEqual(0);
    });

    //getPaddedTime
    it('should correctly convert a date to a padded time', function () {
        var testDate = new Date(2014, 0, 1, 9, 13, 0);
        expect(timeFns.getPaddedTime(testDate)).toEqual('09:13');
    });

    it('should correctly convert a date to a padded time with rounding (1)', function () {
        var testDate = new Date(2014, 0, 1, 9, 13, 0);
        expect(timeFns.getPaddedTime(testDate, true)).toEqual('09:15');
    });

    it('should correctly convert a date to a padded time with rounding (2)', function () {
        var testDate = new Date(2014, 0, 1, 21, 7, 0);
        expect(timeFns.getPaddedTime(testDate, true)).toEqual('21:00');
    });

    it('should correctly convert a date to a padded time with rounding up to the next hour (3)', function () {
        var testDate = new Date(2014, 7, 29, 16, 57, 0);
        expect(timeFns.getPaddedTime(testDate, true)).toEqual('17:00');
    });

    it('should correctly convert a date to a padded time with rounding up to the next hour (4)', function () {
        var testDate = new Date(2014, 7, 29, 9, 57, 0);
        expect(timeFns.getPaddedTime(testDate, true)).toEqual('10:00');
    });

    //addToPaddedTime
    it('should correctly add 15 minutes to a time', function () {
        expect(timeFns.addToPaddedTime('09:00', 0, 15)).toEqual('09:15');
    });

    it('should correctly subtract 15 minutes from a time', function () {
        expect(timeFns.addToPaddedTime('09:00', 0, -15)).toEqual('08:45');
    });

    it('should correctly add 1 hour to a time', function () {
        expect(timeFns.addToPaddedTime('22:15', 1, 0)).toEqual('23:15');
    });

    it('should correctly subtract 1 hour from a time', function () {
        expect(timeFns.addToPaddedTime('22:30', -1, 0)).toEqual('21:30');
    });

    it('should correctly set the hours and minutes and seconds on a given date', function () {
        var testDate = new Date(2014, 3, 15);
        var filledDate = new Date(timeFns.fillDateTime(testDate, '09:30'));
        var filledDate2 = new Date(timeFns.fillDateTime(testDate, '11:45'));

        expect(filledDate.getFullYear()).toEqual(2014);
        expect(filledDate.getMonth()).toEqual(3);
        expect(filledDate.getDate()).toEqual(15);
        expect(filledDate.getHours()).toEqual(9);
        expect(filledDate.getMinutes()).toEqual(30);
        expect(filledDate.getSeconds()).toEqual(0);

        expect(filledDate2.getFullYear()).toEqual(2014);
        expect(filledDate2.getMonth()).toEqual(3);
        expect(filledDate2.getDate()).toEqual(15);
        expect(filledDate2.getHours()).toEqual(11);
        expect(filledDate2.getMinutes()).toEqual(45);
        expect(filledDate2.getSeconds()).toEqual(0);
    });

    it('should correctly get a time converted to minutes', function () {
        var time = '09:45';
        var time2 = '22:15';
        expect(timeFns.test.getMinutes(time)).toEqual(585);
        expect(timeFns.test.getMinutes(time2)).toEqual(1335);
    });

    it('should correctly compare two times to determine if one is less than the other', function() {
        expect(timeFns.timeIsLessThan('09:15', '09:30')).toBeTruthy();
        expect(timeFns.timeIsLessThan('09:15', '09:00')).toBeFalsy();
        expect(timeFns.timeIsLessThan('09:00', '09:00')).toBeFalsy();
    });

    it('should correctly compare two times to determine if one is greater than the other', function() {
        expect(timeFns.timeIsGreaterThan('22:15', '21:15')).toBeTruthy();
        expect(timeFns.timeIsGreaterThan('22:15', '22:30')).toBeFalsy();
        expect(timeFns.timeIsGreaterThan('22:15', '22:15')).toBeFalsy();
    });

    it('should correctly compare two times to determine if one is less than or equal to the other', function() {
        expect(timeFns.timeIsLessThanOrEqual('09:15', '09:30')).toBeTruthy();
        expect(timeFns.timeIsLessThanOrEqual('09:15', '09:00')).toBeFalsy();
        expect(timeFns.timeIsLessThanOrEqual('09:00', '09:00')).toBeTruthy();
    });

    it('should correctly compare two times to determine if one is greater than or equal to the other', function() {
        expect(timeFns.timeIsGreaterThanOrEqual('22:15', '21:15')).toBeTruthy();
        expect(timeFns.timeIsGreaterThanOrEqual('22:15', '22:30')).toBeFalsy();
        expect(timeFns.timeIsGreaterThanOrEqual('22:15', '22:15')).toBeTruthy();
    });

    //parseYMD
    it('should return a valid date from a y-m-d string', function() {
        expect(timeFns.parseYMD('2014-04-14')).toEqual(new Date(2014, 3, 14));
    });

    //convert to YMD
    it('should correctly format a date to y-m-d style', function() {
        expect(timeFns.convertToYMD(new Date(2014, 3, 14))).toEqual('2014-04-14');
    });

});