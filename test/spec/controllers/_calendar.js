/**
 * Created by sdrew on 2/05/2014.
 */
'use strict';

describe('Controller: addEntryFormCtrl', function () {

    // load the controller's module
    beforeEach(module('timeLogApp'));

    var calendarCtrl,
        scope,
        timeFunctions;

    beforeEach(inject(function ($controller, $rootScope, TimeFunctions) {
        scope = $rootScope.$new();

        timeFunctions = TimeFunctions;
        timeFunctions.test.setCurrentDate(new Date(2014, 3, 15, 9, 3, 0));

        calendarCtrl = $controller('calendarCtrl', {
            $scope: scope,
            TimeFunctions: timeFunctions
        });

    }));

    it('should define the calendar events in the scope', function() {
        expect(scope.calendarEvents).toBeDefined();
    });

});