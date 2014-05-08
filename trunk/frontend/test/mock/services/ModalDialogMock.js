/**
 * Created by sdrew on 29/04/2014.
 */
'use strict';

angular.module('timeLogApp').factory('ModalDialogMock', function () {

    return function () {
        this.confirmResult;

        this.confirm = function () {
            return this.confirmResult;
        };

        this.confirmTrue = function () {
            this.confirmResult = true;
        };

        this.confirmFalse = function () {
            this.confirmResult = false;
        }
    };


//    var confirmResult = false;
//
//    var confirmTrue = function () {
//        confirmResult = true;
//    };
//
//    var confirmFalse = function () {
//        confirmResult = false;
//    };
//
//    var confirm = function () {
//        return confirmResult;
//    };
//
//    return {
//        confirmTrue: confirmTrue,
//        confirmFalse: confirmFalse,
//        confirm: confirm
//    };

});

//function ModalDialogMock() {
//    this.confirmResult;
//
//    this.confirm = function () {
//        return this.confirmResult;
//    };
//
//    this.confirmTrue = function () {
//        this.confirmResult = true;
//    };
//
//    this.confirmFalse = function () {
//        this.confirmResult = false;
//    };
//
//}