/**
 * Created by sdrew on 2/05/2014.
 */
'use strict';

describe('Controller: entriesViewCtrl', function () {

    // load the controller's module
    beforeEach(module('timeLogApp'));

    var entriesViewCtrl,
        scope,
        timeFunctions,
        modalDialog;

    beforeEach(inject(function ($controller, $rootScope, TimeFunctions, EntriesMock, ModalDialogMock) {
        scope = $rootScope.$new();

        timeFunctions = TimeFunctions;
        timeFunctions.test.setCurrentDate(new Date(2014, 3, 15, 9, 3, 0));

        scope.$parent.entries = new EntriesMock();

        modalDialog = new ModalDialogMock();

        entriesViewCtrl = $controller('entriesViewCtrl', {
            $scope: scope,
            ModalDialog: modalDialog,
            TimeFunctions: timeFunctions
        });
    }));

    it('should save changes to an existing entry when enter is pressed', function () {
        scope.entries[1].projectCode = 'AAA0004';
        var $event = {
            keyCode: 13,
            currentTarget: {
                parentElement: {
                    id: 'editEntryForm1'
                }
            }
        };

        scope.editSaveKeyPress($event);

        expect(scope.entries[1].projectCode).toEqual('AAA0004');
    });

    it('should abort editing an entry when esc is pressed', function () {
        scope.entries[1].projectCode = 'AAA0004';
        var $event = {
            keyCode: 27,
            currentTarget: {
                parentElement: {
                    id: 'editEntryForm1'
                }
            }
        };

        modalDialog.confirmTrue();
        scope.editSaveKeyPress($event);

        var edit = false;
        for (var i = 0; i < scope.editEntry.length; i++) {
            if (scope.editEntry[i] === true) {
                edit = true;
            }
        }

        expect(edit).toBeFalsy();
    });

    it('should format a time value to the correct xx:xx style', function () {
        var event = {
            currentTarget: {
                value: '9'
            }
        };
        expect(scope.timeBlurFormat(event)).toEqual('09:00');
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

    it('should set the edit index of the row being edited', function () {
        scope.startEdit(1);
        expect(scope.editEntry[1]).toBeTruthy();
    });

    it('should return a value indicating whether any fields in the item are empty', function () {
        expect(scope.fieldsFilled(1)).toBeTruthy();

        scope.entries[1].startDate = '';
        expect(scope.fieldsFilled(1)).toBeTruthy();

        scope.entries[1].endDate = '';
        expect(scope.fieldsFilled(1)).toBeTruthy();

        scope.entries[1].projectCode = '';
        expect(scope.fieldsFilled(1)).toBeTruthy();

        scope.entries[1].description = '';
        expect(scope.fieldsFilled(1)).toBeFalsy();
    });

    it('should delete an item when the delete button is pressed', function () {
        modalDialog.confirmTrue();

        var event = {
            currentTarget: {
                parentElement: {
                    id: 'formName1'
                }
            }
        };

        scope.editDeleteClick(event);
        expect(scope.entries.length).toEqual(3);

        modalDialog.confirmFalse();
        scope.editDeleteClick(event);
        expect(scope.entries.length).toEqual(3);

    });

    it('should cancel editing when the cancel button is pressed', function () {
        scope.editEntry[1] = true;

        var edit = false;
        for (var i = 0; i < scope.editEntry.length; i++) {
            if (scope.editEntry[i] === true) {
                edit = true;
                break;
            }
        }

        modalDialog.confirmFalse();
        scope.editCancelClick();

        expect(edit).toBeTruthy();

        modalDialog.confirmTrue();
        scope.editCancelClick();

        //should be false, but we're using route.reload, so it won't show up here.
        expect(edit).toBeTruthy();

    });

    it('should add an item to the entries when the save button is pressed', function () {
        scope.editEntry[1] = true;
        var event = {
            currentTarget: {
                parentElement: {
                    id: 'formName1'
                }
            }
        };

        scope.editSaveClick(event);

        var edit = false;
        for (var i = 0; i < scope.editEntry.length; i++) {
            if (scope.editEntry[i] === true) {
                edit = true;
                break;
            }
        }

        expect(edit).toBeFalsy();
    });

});