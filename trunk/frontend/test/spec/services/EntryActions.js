/**
 * Created by sdrew on 16/04/2014.
 */
'use strict';

describe('Service: EntryActions', function () {

    // load the service's module
    beforeEach(module('timeLogApp'));

    var entryActions, timeFunctions, event, currentTime, scope;
    var entries;

    beforeEach(inject(function (EntryActions, TimeFunctions, $rootScope, EntriesMock) {
        entryActions = EntryActions;
        timeFunctions = TimeFunctions;
        scope = $rootScope.$new();
        entries = new EntriesMock();
        scope.entries = entries;

        event = {
            keyCode: 0,
            ctrlKey: false,
            shiftKey: false,
            currentTarget: {
                value: ''
            }
        };

        timeFunctions.test.setCurrentDate(new Date(2014, 3, 15, 9, 3, 0));
        currentTime = timeFunctions.getPaddedTime(timeFunctions.getCurrentDate(), true);
    }));

    it('should return the current time to the nearest 15 minutes when ctrl+space is pressed', function () {
        var currentEvent = event;
        currentEvent.keyCode = 32;
        currentEvent.ctrlKey = true;

        expect(entryActions.test.getTimeKeyPressValue(currentEvent, entries)).toEqual(currentTime);
    });

    it('should return the end time of the last existing entry when ctrl+shift+space is pressed', function () {
        var currentEvent = event;
        currentEvent.keyCode = 32;
        currentEvent.ctrlKey = true;
        currentEvent.shiftKey = true;
        var maxEndTime = entries[entries.length - 1].entryDate;
        maxEndTime.setHours(entries[entries.length - 1].endH);
        maxEndTime.setMinutes(entries[entries.length - 1].endM);

        expect(entryActions.test.getTimeKeyPressValue(currentEvent, entries)).toEqual(timeFunctions.getPaddedTime(maxEndTime));
    });

    it('should return the set value plus one hour when shift+up is pressed', function () {
        var currentEvent = event;
        currentEvent.keyCode = 38;
        currentEvent.shiftKey = true;
        currentEvent.currentTarget.value = '14:30';

        expect(entryActions.test.getTimeKeyPressValue(currentEvent, entries)).toEqual('15:30');
    });

    it('should return the set value plus 15 minutes when up is pressed', function () {
        var currentEvent = event;
        currentEvent.keyCode = 38;
        currentEvent.currentTarget.value = '14:30';

        expect(entryActions.test.getTimeKeyPressValue(currentEvent, entries)).toEqual('14:45');
    });

    it('should return the set value minus one hour when shift+down is pressed', function () {
        var currentEvent = event;
        currentEvent.keyCode = 40;
        currentEvent.shiftKey = true;
        currentEvent.currentTarget.value = '14:30';

        expect(entryActions.test.getTimeKeyPressValue(currentEvent, entries)).toEqual('13:30');
    });

    it('should return the set value minus 15 minutes when down is pressed', function () {
        var currentEvent = event;
        currentEvent.keyCode = 40;
        currentEvent.currentTarget.value = '14:30';

        expect(entryActions.test.getTimeKeyPressValue(currentEvent, entries)).toEqual('14:15');
    });

    it('should return a new blank entry', function () {
        var newEntry = entryActions.getBlankEntry();

        expect(newEntry.startDate).toEqual('');
        expect(newEntry.endDate).toEqual('');
        expect(newEntry.projectCode).toEqual('');
        expect(newEntry.description).toEqual('');
    });

    it('should set the entry fields to have values when they are passed in empty, and time should start from the last entry', function () {
        scope.entry = entryActions.getBlankEntry();
        entryActions.setupDefaultEntry(scope);

        expect(scope.entry.startDate).toEqual('11:30');
        expect(scope.entry.endDate).toEqual('11:45');
        expect(scope.entry.projectCode).toEqual('');
        expect(scope.entry.description).toEqual('');
    });

    it('should set the entry fields to have values when they are passed in empty, and time should start time to now (rounded) if there are no entries', function () {
        scope.entry = entryActions.getBlankEntry();
        scope.entries = [];
        entryActions.setupDefaultEntry(scope);

        expect(scope.entry.startDate).toEqual('09:00');
        expect(scope.entry.endDate).toEqual('09:15');
        expect(scope.entry.projectCode).toEqual('');
        expect(scope.entry.description).toEqual('');
    });

    it('should not change any field values if there is already text in the new entry', function () {
        scope.entry = entryActions.getBlankEntry();
        scope.entry.projectCode = 'CSU0071';
        entryActions.setupDefaultEntry(scope);

        expect(scope.entry.startDate).toEqual('');
        expect(scope.entry.endDate).toEqual('');
        expect(scope.entry.projectCode).toEqual('CSU0071');
    });

    it('should return nothing if no value is submitted to timeBlurFormat', function () {
        expect(entryActions.timeBlurFormat('')).toEqual('');
    });

    it('should return a valid time if a full time is submitted to timeBlurFormat', function() {
       expect(entryActions.timeBlurFormat('23:15')).toEqual('23:15');
    });

    it('should return a valid time if a full time is submitted to timeBlurFormat', function() {
        expect(entryActions.timeBlurFormat('9:15')).toEqual('09:15');
    });

    it('should return a valid time if a 2 digit time is submitted to timeBlurFormat', function() {
        expect(entryActions.timeBlurFormat('21')).toEqual('21:00');
    });

    it('should return a valid time if a 3 digit time is submitted to timeBlurFormat', function() {
        expect(entryActions.timeBlurFormat('715')).toEqual('07:15');
    });

    it('should return a valid time if a 4 digit time is submitted to timeBlurFormat', function() {
        expect(entryActions.timeBlurFormat('1745')).toEqual('17:45');
    });

});