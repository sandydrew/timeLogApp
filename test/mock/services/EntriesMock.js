/**
 * Created by sdrew on 2/05/2014.
 */
'use strict';
angular.module('timeLogApp').factory('EntriesMock', function () {
    return function () {
        return [
            { entryId: 1, entryDate: new Date(Date.UTC(2014, 3, 15)), startH: 9, startM: 0, endH: 9, endM: 30, projectCode: 'CSU0071', description: 'Did some stuff. 15' },
            { entryId: 2, entryDate: new Date(Date.UTC(2014, 3, 15)), startH: 9, startM: 30, endH: 10, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 15' },
            { entryId: 3, entryDate: new Date(Date.UTC(2014, 3, 15)), startH: 10, startM: 30, endH: 11, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 15' }
        ];
    }
});