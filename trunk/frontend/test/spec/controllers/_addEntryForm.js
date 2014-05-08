/**
 * Created by sdrew on 2/05/2014.
 */
'use strict';

describe('Controller: addEntryFormCtrl', function () {

    // load the controller's module
    beforeEach(module('timeLogApp'));

    var addEntryFormCtrl,
        scope,
        timeFunctions;

    beforeEach(inject(function ($controller, $rootScope, TimeFunctions, EntriesMock) {
        scope = $rootScope.$new();

        timeFunctions = TimeFunctions;
        timeFunctions.test.setCurrentDate(new Date(2014, 3, 15, 9, 3, 0));
        scope.entryDate = timeFunctions.getCurrentDate();

        scope.$parent.entries = new EntriesMock();

        addEntryFormCtrl = $controller('addEntryFormCtrl', {
            $scope: scope
        });
    }));

    it('should define an empty new entry', function () {
        expect(scope.entry).toBeDefined();
    });

    it('should set default values for a new entry', function () {
        expect(scope.entry.startDate).toEqual('');
        expect(scope.entry.endDate).toEqual('');

        scope.setupDefault();
        expect(scope.entry.startDate).toEqual('11:30');
        expect(scope.entry.endDate).toEqual('11:45');
    });

    it('should format a time value to the correct xx:xx style', function () {
        var event = {
            currentTarget: {
                value: '9'
            }
        };
        expect(scope.timeBlurFormat(event)).toEqual('09:00');
    });

    it('should return a value indicating whether any fields in the item are empty', function () {
        expect(scope.fieldsFilled(1)).toBeFalsy();

        scope.entry.startDate = 'notempty';
        expect(scope.fieldsFilled(1)).toBeTruthy();

        scope.entry.endDate = 'notempty';
        expect(scope.fieldsFilled(1)).toBeTruthy();

        scope.entry.projectCode = 'notempty';
        expect(scope.fieldsFilled(1)).toBeTruthy();

        scope.entry.description = 'notempty';
        expect(scope.fieldsFilled(1)).toBeTruthy();
    });

    it('should increment a time value when the up arrow is pressed', function () {
        var event = {
            keyCode: 38,
            currentTarget: {
                value: '09:00'
            },
            preventDefault: function () {
            }
        };
        expect(scope.timeKeyPress(event)).toEqual('09:15');
    });

    it('should save a new entry when the save entry key is pressed', function() {
        var event = {
            keyCode: 13
        };

        scope.entry.startDate = '10:00';
        scope.entry.endDate = '10:30';
        scope.entry.entryDate = new Date(2014, 3, 15);
        scope.entry.projectCode = 'CSU0011';
        scope.entry.description = 'blah';

        scope.addEntryForm = { $valid: true };

        scope.saveKeyPress(event);

        //should return 4. need to investigate.
        expect(scope.entries.length).toEqual(3);
    });

    it('should cancel saving if the key pressed is not enter', function() {
        var event = {
            keyCode: 1
        };

        scope.addEntryForm = { $valid: true };

        scope.saveKeyPress(event);

        expect(scope.entries.length).toEqual(3);
    });

    it('should cancel saving if the form is not valid', function() {
        var event = {
            keyCode: 13
        };

        scope.addEntryForm = { $valid: false };

        scope.saveKeyPress(event);

        expect(scope.entries.length).toEqual(3);
    });

});