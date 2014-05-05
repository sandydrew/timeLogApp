/*global _:false */
/**
 * Created by sdrew on 15/04/2014.

 */
'use strict';
angular.module('e2e-mocks', ['ngMockE2E'])
    .run(function ($httpBackend) {

        var entries = [
            { entryId: 1, entryDate: new Date(Date.UTC(2014, 3, 15)), startH: 9, startM: 0, endH: 9, endM: 30, projectCode: 'CSU0071', description: 'Did some stuff. 15' },
            { entryId: 2, entryDate: new Date(Date.UTC(2014, 3, 15)), startH: 9, startM: 30, endH: 10, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 15' },
            { entryId: 3, entryDate: new Date(Date.UTC(2014, 3, 15)), startH: 10, startM: 30, endH: 11, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 15' },

            { entryId: 4, entryDate: new Date(Date.UTC(2014, 3, 16)), startH: 9, startM: 0, endH: 9, endM: 30, projectCode: 'CSU0071', description: 'Did some stuff. 16' },
            { entryId: 5, entryDate: new Date(Date.UTC(2014, 3, 16)), startH: 9, startM: 30, endH: 10, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 16' },
            { entryId: 6, entryDate: new Date(Date.UTC(2014, 3, 16)), startH: 10, startM: 30, endH: 11, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 16' },

            { entryId: 7, entryDate: new Date(Date.UTC(2014, 3, 17)), startH: 9, startM: 0, endH: 9, endM: 30, projectCode: 'CSU0071', description: 'Did some stuff. 17' },
            { entryId: 8, entryDate: new Date(Date.UTC(2014, 3, 17)), startH: 9, startM: 30, endH: 10, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 17' },
            { entryId: 9, entryDate: new Date(Date.UTC(2014, 3, 17)), startH: 10, startM: 30, endH: 11, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 17' }
        ];

        var nextId = 10;

        var urlMatch = /^api\/entries\/(\d{4}-\d{1,2}-\d{1,2})$/i;

//        $httpBackend.whenGET(urlMatch).respond(entries);

        $httpBackend.whenGET(urlMatch).respond(function (method, url) {
            return [200, getFilteredEntries(url), {}];
        });

        var getFilteredEntries = function (url) {
            var dateSplit = urlMatch.exec(url)[1].split('-');
            var requestedDate = new Date(Date.UTC(parseInt(dateSplit[0]), parseInt(dateSplit[1], 10) - 1, parseInt(dateSplit[2])));

            return _.filter(entries, function (entry) {
                return entry.entryDate.getFullYear() === requestedDate.getFullYear() &&
                    entry.entryDate.getMonth() === requestedDate.getMonth() &&
                    entry.entryDate.getDate() === requestedDate.getDate();
            });
        };

        $httpBackend.whenPOST('api/entries').respond(function (method, url, data) {
            var dataFixed = angular.fromJson(data);
            var existingIdIndex = -1;

            if(dataFixed.entryId > 0) {
                for(var entryIndex = 0; entryIndex < entries.length; entryIndex ++) {
                    if(entries[entryIndex].entryId === dataFixed.entryId) {
                        existingIdIndex = entryIndex;
                        break;
                    }
                }
            }

            dataFixed.entryDate = new Date(dataFixed.entryDate);
            dataFixed.startH = parseInt(dataFixed.startH, 10);
            dataFixed.startM = parseInt(dataFixed.startM, 10);
            dataFixed.endH = parseInt(dataFixed.endH, 10);
            dataFixed.endM = parseInt(dataFixed.endM, 10);

            if(existingIdIndex > -1) {
                entries[existingIdIndex] = dataFixed;
            } else {
                dataFixed.entryId = nextId++;
                entries.push(dataFixed);
            }

            return [200, {}, {}];
        });

        var deleteMatch = /api\/entries\?entryId=(\d+)/;
        $httpBackend.whenDELETE(deleteMatch).respond(function(method, url) {
            var entryId = parseInt(deleteMatch.exec(url)[1], 10);

            var existingIdIndex = -1;

            for(var entryIndex = 0; entryIndex < entries.length; entryIndex ++) {
                if(entries[entryIndex].entryId === entryId) {
                    existingIdIndex = entryIndex;
                    break;
                }
            }

            if(existingIdIndex > -1) {
                entries.splice(existingIdIndex, 1);
            }

            return [200, {}, {}];
        });

        // For everything else, don't mock
        $httpBackend.whenGET(/^\w+.*/).passThrough();
        $httpBackend.whenPOST(/^\w+.*/).passThrough();

    });

angular.module('timeLogApp').requires.push('e2e-mocks');