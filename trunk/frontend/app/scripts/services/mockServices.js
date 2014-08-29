/*global _:false */
/**
 * Created by sdrew on 15/04/2014.

 */
'use strict';
angular.module('e2e-mocks', ['ngMockE2E'])
    .run(function ($httpBackend) {

//        var entries = [
//            { entryId: 1, entryDate: '2014-04-15T00:00:00Z', startH: 9, startM: 0, endH: 9, endM: 30, projectCode: 'CSU0071', description: 'Did some stuff. 15' },
//            { entryId: 2, entryDate: '2014-04-15T00:00:00Z', startH: 9, startM: 30, endH: 10, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 15' },
//            { entryId: 3, entryDate: '2014-04-15T00:00:00Z', startH: 10, startM: 30, endH: 11, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 15' },
//
//            { entryId: 4, entryDate: '2014-04-16T00:00:00Z', startH: 9, startM: 0, endH: 9, endM: 30, projectCode: 'CSU0071', description: 'Did some stuff. 16' },
//            { entryId: 5, entryDate: '2014-04-16T00:00:00Z', startH: 9, startM: 30, endH: 10, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 16' },
//            { entryId: 6, entryDate: '2014-04-16T00:00:00Z', startH: 10, startM: 30, endH: 11, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 16' },
//
//            { entryId: 7, entryDate: '2014-04-17T00:00:00Z', startH: 9, startM: 0, endH: 9, endM: 30, projectCode: 'CSU0071', description: 'Did some stuff. 17' },
//            { entryId: 8, entryDate: '2014-04-17T00:00:00Z', startH: 9, startM: 30, endH: 10, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 17' },
//            { entryId: 9, entryDate: '2014-04-17T00:00:00Z', startH: 10, startM: 30, endH: 11, endM: 30, projectCode: 'CSU0072', description: 'Did some more stuff. 17' }
//        ];

        var entries = [{
                'entryId': 116,
                'entryDate': '2014-07-01T00:00:00Z',
                'startH': 13,
                'startM': 0,
                'endH': 16,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Fix QAS issue.'
            },
            {
                'entryId': 117,
                'entryDate': '2014-07-01T00:00:00Z',
                'startH': 16,
                'startM': 0,
                'endH': 17,
                'endM': 15,
                'projectCode': 'CSU0071',
                'description': 'Update deployment scripts.'
            },
            {
                'entryId': 120,
                'entryDate': '2014-07-01T00:00:00Z',
                'startH': 19,
                'startM': 30,
                'endH': 21,
                'endM': 30,
                'projectCode': 'DT0273',
                'description': 'Update to get daily stats.'
            },
            {
                'entryId': 121,
                'entryDate': '2014-07-02T00:00:00Z',
                'startH': 8,
                'startM': 0,
                'endH': 11,
                'endM': 45,
                'projectCode': 'CSU0071',
                'description': 'Preparation for deployment to stg.'
            },
            {
                'entryId': 122,
                'entryDate': '2014-07-02T00:00:00Z',
                'startH': 13,
                'startM': 45,
                'endH': 16,
                'endM': 30,
                'projectCode': 'CSU0071',
                'description': 'Preparation for deployment to stg.'
            },
            {
                'entryId': 123,
                'entryDate': '2014-07-02T00:00:00Z',
                'startH': 16,
                'startM': 30,
                'endH': 18,
                'endM': 30,
                'projectCode': 'CSU0071',
                'description': 'Fix retroactive thingy.'
            },
            {
                'entryId': 124,
                'entryDate': '2014-07-02T00:00:00Z',
                'startH': 19,
                'startM': 45,
                'endH': 23,
                'endM': 45,
                'projectCode': 'CSU0071',
                'description': 'Fix retroactive thingy.'
            },
            {
                'entryId': 125,
                'entryDate': '2014-07-03T00:00:00Z',
                'startH': 8,
                'startM': 15,
                'endH': 18,
                'endM': 15,
                'projectCode': 'CSU0071',
                'description': 'Staging deployment of drop 20.'
            },
            {
                'entryId': 126,
                'entryDate': '2014-07-04T00:00:00Z',
                'startH': 6,
                'startM': 45,
                'endH': 16,
                'endM': 15,
                'projectCode': 'CSU0071',
                'description': 'Validate deployment.'
            },
            {
                'entryId': 127,
                'entryDate': '2014-07-07T00:00:00Z',
                'startH': 9,
                'startM': 15,
                'endH': 17,
                'endM': 30,
                'projectCode': 'CSU0071',
                'description': 'Fix remaining issues at Coles.'
            },
            {
                'entryId': 128,
                'entryDate': '2014-07-08T00:00:00Z',
                'startH': 7,
                'startM': 45,
                'endH': 12,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Triage QC bugs.'
            },
            {
                'entryId': 129,
                'entryDate': '2014-07-08T00:00:00Z',
                'startH': 12,
                'startM': 30,
                'endH': 18,
                'endM': 45,
                'projectCode': 'CSU0071',
                'description': 'Bugs.'
            },
            {
                'entryId': 130,
                'entryDate': '2014-07-09T00:00:00Z',
                'startH': 8,
                'startM': 15,
                'endH': 17,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Support at Coles.'
            },
            {
                'entryId': 131,
                'entryDate': '2014-07-10T00:00:00Z',
                'startH': 7,
                'startM': 45,
                'endH': 12,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Regression bugs. Support at coles.'
            },
            {
                'entryId': 132,
                'entryDate': '2014-07-10T00:00:00Z',
                'startH': 12,
                'startM': 30,
                'endH': 17,
                'endM': 15,
                'projectCode': 'CSU0071',
                'description': 'Regression bugs.'
            },
            {
                'entryId': 133,
                'entryDate': '2014-07-11T00:00:00Z',
                'startH': 9,
                'startM': 0,
                'endH': 12,
                'endM': 30,
                'projectCode': 'CSU0071',
                'description': 'Bug triage. IE analytics bug.'
            },
            {
                'entryId': 134,
                'entryDate': '2014-07-11T00:00:00Z',
                'startH': 13,
                'startM': 0,
                'endH': 15,
                'endM': 15,
                'projectCode': 'CSU0071',
                'description': 'IE analytics bug.'
            },
            {
                'entryId': 135,
                'entryDate': '2014-07-11T00:00:00Z',
                'startH': 15,
                'startM': 15,
                'endH': 17,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Related products add to cart tracking'
            },
            {
                'entryId': 136,
                'entryDate': '2014-07-11T00:00:00Z',
                'startH': 17,
                'startM': 0,
                'endH': 18,
                'endM': 30,
                'projectCode': 'CSU0071',
                'description': 'Related products not appearing if not personalised.'
            },
            {
                'entryId': 137,
                'entryDate': '2014-07-12T00:00:00Z',
                'startH': 9,
                'startM': 0,
                'endH': 12,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Triage bugs.'
            },
            {
                'entryId': 138,
                'entryDate': '2014-07-12T00:00:00Z',
                'startH': 12,
                'startM': 30,
                'endH': 19,
                'endM': 15,
                'projectCode': 'CSU0071',
                'description': 'Fix bugs.'
            },
            {
                'entryId': 139,
                'entryDate': '2014-07-13T00:00:00Z',
                'startH': 14,
                'startM': 0,
                'endH': 17,
                'endM': 45,
                'projectCode': 'CSU0071',
                'description': 'Bug fixes. Update config files.'
            },
            {
                'entryId': 140,
                'entryDate': '2014-07-14T00:00:00Z',
                'startH': 9,
                'startM': 15,
                'endH': 17,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Update bugs. Compare web.configs. Price tracking bug.'
            },
            {
                'entryId': 141,
                'entryDate': '2014-07-15T00:00:00Z',
                'startH': 8,
                'startM': 30,
                'endH': 11,
                'endM': 30,
                'projectCode': 'CSU0071',
                'description': 'Fix configurable scoring. Scores not being persisted.'
            },
            {
                'entryId': 142,
                'entryDate': '2014-07-15T00:00:00Z',
                'startH': 11,
                'startM': 30,
                'endH': 14,
                'endM': 15,
                'projectCode': 'CSU0071',
                'description': 'Retrospective purchase scoring.'
            },
            {
                'entryId': 143,
                'entryDate': '2014-07-15T00:00:00Z',
                'startH': 14,
                'startM': 15,
                'endH': 18,
                'endM': 15,
                'projectCode': 'CSU0071',
                'description': 'Price profile tracking fix.'
            },
            {
                'entryId': 144,
                'entryDate': '2014-07-16T00:00:00Z',
                'startH': 6,
                'startM': 15,
                'endH': 10,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Bug fixes.'
            },
            {
                'entryId': 145,
                'entryDate': '2014-07-16T00:00:00Z',
                'startH': 10,
                'startM': 0,
                'endH': 17,
                'endM': 15,
                'projectCode': 'CSU0071',
                'description': 'Retrospective profile update.'
            },
            {
                'entryId': 146,
                'entryDate': '2014-07-17T00:00:00Z',
                'startH': 6,
                'startM': 30,
                'endH': 7,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Fix wine club banner.'
            },
            {
                'entryId': 147,
                'entryDate': '2014-07-17T00:00:00Z',
                'startH': 7,
                'startM': 0,
                'endH': 11,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Compare Prod configs.'
            },
            {
                'entryId': 148,
                'entryDate': '2014-07-17T00:00:00Z',
                'startH': 11,
                'startM': 0,
                'endH': 12,
                'endM': 45,
                'projectCode': 'CSU0071',
                'description': 'Get bestsellers, fix CAS error.'
            },
            {
                'entryId': 149,
                'entryDate': '2014-07-17T00:00:00Z',
                'startH': 13,
                'startM': 0,
                'endH': 13,
                'endM': 30,
                'projectCode': 'CSU0071',
                'description': 'Fix CAS error.'
            },
            {
                'entryId': 150,
                'entryDate': '2014-07-17T00:00:00Z',
                'startH': 13,
                'startM': 30,
                'endH': 14,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Investigate QC194, GA bug.'
            },
            {
                'entryId': 151,
                'entryDate': '2014-07-17T00:00:00Z',
                'startH': 14,
                'startM': 0,
                'endH': 14,
                'endM': 30,
                'projectCode': 'CSU0071',
                'description': 'Deployment meeting'
            },
            {
                'entryId': 152,
                'entryDate': '2014-07-17T00:00:00Z',
                'startH': 14,
                'startM': 30,
                'endH': 17,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Check index for product added.'
            },
            {
                'entryId': 153,
                'entryDate': '2014-07-18T00:00:00Z',
                'startH': 6,
                'startM': 30,
                'endH': 9,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Test indexing new product.'
            },
            {
                'entryId': 154,
                'entryDate': '2014-07-18T00:00:00Z',
                'startH': 9,
                'startM': 0,
                'endH': 10,
                'endM': 45,
                'projectCode': 'CSU0071',
                'description': 'Update documentation.'
            },
            {
                'entryId': 155,
                'entryDate': '2014-07-18T00:00:00Z',
                'startH': 10,
                'startM': 45,
                'endH': 12,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Performance test staging vs prod.'
            },
            {
                'entryId': 156,
                'entryDate': '2014-07-18T00:00:00Z',
                'startH': 12,
                'startM': 30,
                'endH': 13,
                'endM': 15,
                'projectCode': 'CSU0071',
                'description': 'Validate all CAS and CDS logins.'
            },
            {
                'entryId': 157,
                'entryDate': '2014-07-18T00:00:00Z',
                'startH': 13,
                'startM': 15,
                'endH': 14,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Retrospective personalisation.'
            },
            {
                'entryId': 158,
                'entryDate': '2014-07-18T00:00:00Z',
                'startH': 14,
                'startM': 0,
                'endH': 15,
                'endM': 15,
                'projectCode': 'CSU0071',
                'description': 'Update bestsellers for testers.'
            },
            {
                'entryId': 159,
                'entryDate': '2014-07-21T00:00:00Z',
                'startH': 6,
                'startM': 0,
                'endH': 19,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Deployment'
            },
            {
                'entryId': 160,
                'entryDate': '2014-07-21T00:00:00Z',
                'startH': 19,
                'startM': 45,
                'endH': 20,
                'endM': 30,
                'projectCode': 'CS&0071',
                'description': 'Write incident briefing'
            },
            {
                'entryId': 161,
                'entryDate': '2014-07-22T00:00:00Z',
                'startH': 6,
                'startM': 15,
                'endH': 11,
                'endM': 45,
                'projectCode': 'CSU0071',
                'description': 'Validate deployed items.'
            },
            {
                'entryId': 162,
                'entryDate': '2014-07-22T00:00:00Z',
                'startH': 12,
                'startM': 0,
                'endH': 13,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Validate deployed items.'
            },
            {
                'entryId': 163,
                'entryDate': '2014-07-22T00:00:00Z',
                'startH': 13,
                'startM': 0,
                'endH': 18,
                'endM': 30,
                'projectCode': 'CSU0071',
                'description': 'VC performance issue.'
            },
            {
                'entryId': 164,
                'entryDate': '2014-07-22T00:00:00Z',
                'startH': 18,
                'startM': 30,
                'endH': 19,
                'endM': 0,
                'projectCode': 'CSU???',
                'description': 'Move LivePerson chat indicator.'
            },
            {
                'entryId': 166,
                'entryDate': '2014-07-22T00:00:00Z',
                'startH': 20,
                'startM': 0,
                'endH': 20,
                'endM': 30,
                'projectCode': 'CSU0071',
                'description': 'Performance testing.'
            },
            {
                'entryId': 165,
                'entryDate': '2014-07-23T00:00:00Z',
                'startH': 7,
                'startM': 0,
                'endH': 17,
                'endM': 0,
                'projectCode': 'CSU0071',
                'description': 'Performance benchmarking'
            },
            {
                'entryId': 167,
                'entryDate': '2014-07-24T00:00:00Z',
                'startH': 8,
                'startM': 15,
                'endH': 9,
                'endM': 15,
                'projectCode': 'CSU0071',
                'description': 'Performance testing.'
            }];

        var nextId = 10;

//        var urlSingleDayMatch = /^api\/entries\/(\d{4}-\d{1,2}-\d{1,2})$/i;
        var urlMultiDayMatch = /^api\/entries\/(\d{4}-\d{1,2}-\d{1,2})\/(\d{4}-\d{1,2}-\d{1,2})$/i;

//        $httpBackend.whenGET(urlSingleDayMatch).respond(function (method, url) {
//            return [200, getFilteredEntries(url), {}];
//        });

        $httpBackend.whenGET(urlMultiDayMatch).respond(function (method, url) {
            return [200, getFilteredMultiDayEntries(url), {}];
        });

//        var getFilteredEntries = function (url) {
//            var dateSplit = urlSingleDayMatch.exec(url)[1].split('-');
//            var requestedDate = new Date(Date.UTC(parseInt(dateSplit[0]), parseInt(dateSplit[1], 10) - 1, parseInt(dateSplit[2])));
//
//            return _.filter(entries, function (entry) {
//                return entry.entryDate.getFullYear() === requestedDate.getFullYear() &&
//                    entry.entryDate.getMonth() === requestedDate.getMonth() &&
//                    entry.entryDate.getDate() === requestedDate.getDate();
//            });
//        };

        var getFilteredMultiDayEntries = function (url) {
            var dateSplit = urlMultiDayMatch.exec(url);
            var startText = dateSplit[1];
            var endText = dateSplit[2];

            var startElements = startText.split('-');
            var endElements = endText.split('-');

            var startDate = new Date(Date.UTC(parseInt(startElements[0]), parseInt(startElements[1], 10) - 1, parseInt(startElements[2])));
            var endDate = new Date(Date.UTC(parseInt(endElements[0]), parseInt(endElements[1], 10) - 1, parseInt(endElements[2])));

            return _.filter(entries, function (entry) {
                return new Date(entry.entryDate) >= startDate &&
                    new Date(entry.entryDate) < endDate;
            });
        };

        $httpBackend.whenPOST('api/entries').respond(function (method, url, data) {
            var dataFixed = angular.fromJson(data);
            var existingIdIndex = -1;

            if (dataFixed.entryId > 0) {
                for (var entryIndex = 0; entryIndex < entries.length; entryIndex++) {
                    if (entries[entryIndex].entryId === dataFixed.entryId) {
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

            if (existingIdIndex > -1) {
                entries[existingIdIndex] = dataFixed;
            } else {
                dataFixed.entryId = nextId++;
                entries.push(dataFixed);
            }

            return [200, {}, {}];
        });

        var deleteMatch = /api\/entries\?entryId=(\d+)/;
        $httpBackend.whenDELETE(deleteMatch).respond(function (method, url) {
            var entryId = parseInt(deleteMatch.exec(url)[1], 10);

            var existingIdIndex = -1;

            for (var entryIndex = 0; entryIndex < entries.length; entryIndex++) {
                if (entries[entryIndex].entryId === entryId) {
                    existingIdIndex = entryIndex;
                    break;
                }
            }

            if (existingIdIndex > -1) {
                entries.splice(existingIdIndex, 1);
            }

            return [200, {}, {}];
        });

        // For everything else, don't mock
        $httpBackend.whenGET(/^\w+.*/).passThrough();
        $httpBackend.whenPOST(/^\w+.*/).passThrough();

    });

angular.module('timeLogApp').requires.push('e2e-mocks');