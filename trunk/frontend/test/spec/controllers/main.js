'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('timeLogApp'));

    var MainCtrl,
        scope,
        entriesItems,
        timeFunctions;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, TimeFunctions, EntriesMock) {
        scope = $rootScope.$new();
        timeFunctions = TimeFunctions;
        timeFunctions.test.setCurrentDate(new Date(2014, 3, 15, 9, 3, 0));
        entriesItems = new EntriesMock();

        MainCtrl = $controller('MainCtrl', {
            $scope: scope,
            entries: entriesItems
        });
    }));

    it('should have three entries', function () {
        expect(scope.entries.length).toEqual(3);
    });

    it('should get the total hours worked in the day', function () {
        var hoursWorked = scope.getHoursWorked();
        expect(hoursWorked).toEqual(2.5);
    });

    it('should have the correct entry date as per the timefunctions currentdate', function () {
        expect(scope.entryDate).toEqual(timeFunctions.getCurrentDate());
    });

});
