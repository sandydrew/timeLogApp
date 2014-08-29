/**
 * Created by sdrew on 2/05/2014.
 */
'use strict';

describe('Controller: addEntryFormCtrl', function () {

    // load the controller's module
    beforeEach(module('timeLogApp'));
    beforeEach(module('timeLogApp.services'));

    var timeFunctions,
        multiEntryLoader;

    beforeEach(inject(function (TimeFunctions, MultiEntryLoader) {
        timeFunctions = new TimeFunctions();
        timeFunctions.test.setCurrentDate(new Date(2014, 3, 15, 9, 3, 0));
        multiEntryLoader = new MultiEntryLoader('2014-4-15');

    }));

    //not actually sure how to setup tests for this yet.

});