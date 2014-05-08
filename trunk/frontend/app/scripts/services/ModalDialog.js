/**
 * Created by sdrew on 29/04/2014.
 */
'use strict';
angular.module('timeLogApp').factory('ModalDialog', ['$window', function ($window) {
    return {
        confirm: function (message) {
            return $window.confirm(message);
        }
    };
}]);