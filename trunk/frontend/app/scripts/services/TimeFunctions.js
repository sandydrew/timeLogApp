/**
 * Created by sdrew on 16/04/2014.
 */
'use strict';

angular.module('timeLogApp').factory('TimeFunctions', function () {

    var roundMinutes = function (minutes) {

        var mod = minutes % 15;
        if (mod === 0) {
            return minutes;
        }

        if (mod < 8) {
            return minutes - mod;
        }

        var roundedMinutes = minutes + (15 - mod);
        return (roundedMinutes === 60) ? 0 : roundedMinutes;
    };

    var padNumber = function (n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };

    var getPaddedTime = function (dateTime, roundMinutesTo15) {
        var originalHours = dateTime.getHours();
        var originalMinutes = dateTime.getMinutes();
        var hours = padNumber(originalHours, 2);
        var minutes = roundMinutesTo15 ? padNumber(roundMinutes(originalMinutes), 2) : padNumber(originalMinutes, 2);

        //round up if near the top of the hour.
        if (roundMinutesTo15 && originalMinutes > 45 && minutes === '00') {
            hours = padNumber(originalHours + 1, 2);
        }

        return hours + ':' + minutes;
    };

    var addToPaddedTime = function (value, addHours, addMinutes) {
        var arrValues = value.split(':');
        var hours = parseInt(arrValues[0], 10);
        var minutes = parseInt(arrValues[1], 10);
        var oldDate = new Date(2000, 0, 1, hours, minutes, 0);
        var newDate = new Date(2000, 0, 1);
        newDate.setHours(oldDate.getHours() + addHours);
        newDate.setMinutes(oldDate.getMinutes() + addMinutes);

        return getPaddedTime(newDate);
    };

    var currentDate = null;

    var getCurrentDate = function () {
        if (currentDate !== null) {
            return currentDate;
        }

        return new Date();
    };

    var getMinutes = function (time) {
        var timeSplit = time.split(':');
        return (parseInt(timeSplit[0], 10) * 60) + parseInt(timeSplit[1], 10);
    };

    var timeIsLessThan = function (time1, time2) {
        return getMinutes(time1) < getMinutes(time2);
    };

    var timeIsGreaterThan = function (time1, time2) {
        return getMinutes(time1) > getMinutes(time2);
    };

    var timeIsLessThanOrEqual = function (time1, time2) {
        return getMinutes(time1) <= getMinutes(time2);
    };

    var timeIsGreaterThanOrEqual = function (time1, time2) {
        return getMinutes(time1) >= getMinutes(time2);
    };

    var fillDateTime = function (date, timeValue) {
        var timeValueSplit = timeValue.split(':');
        date.setHours(parseInt(timeValueSplit[0], 10));
        date.setMinutes(parseInt(timeValueSplit[1], 10));
        date.setSeconds(0);
        return date;
    };

    var setCurrentDate = function (newDate) {
        currentDate = newDate;
    };

    var parseYMD = function (ymdValue) {
        var dateSplit = ymdValue.split('-');
        return new Date(parseInt(dateSplit[0], 10), parseInt(dateSplit[1], 10) - 1, parseInt(dateSplit[2], 10));
    };

    var convertToYMD = function (dateValue) {
        var ymd = [];
        ymd.push(padNumber(dateValue.getFullYear(), 4));
        ymd.push(padNumber(dateValue.getMonth() + 1, 2));
        ymd.push(padNumber(dateValue.getDate(), 2));

        return ymd.join('-');
    };

    var test = {
        currentDate: currentDate,
        setCurrentDate: setCurrentDate,
        getMinutes: getMinutes
    };

    return {
        roundMinutes: roundMinutes,
        padNumber: padNumber,
        getPaddedTime: getPaddedTime,
        addToPaddedTime: addToPaddedTime,
        getCurrentDate: getCurrentDate,
        fillDateTime: fillDateTime,
        parseYMD: parseYMD,
        convertToYMD: convertToYMD,
        timeIsLessThan: timeIsLessThan,
        timeIsGreaterThan: timeIsGreaterThan,
        timeIsLessThanOrEqual: timeIsLessThanOrEqual,
        timeIsGreaterThanOrEqual: timeIsGreaterThanOrEqual,
        test: test
    };
});