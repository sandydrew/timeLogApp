/*global $:false */
/**
 * Created by sdrew on 1/05/2014.
 */
'use strict';
angular.module('timeLogApp')
    .controller('calendarCtrl', ['$scope', '$rootScope', '$location', 'TimeFunctions', function ($scope, $rootScope, $location, timeFunctions) {

        $scope.calendarEvents = [];

        $scope.uiConfig = {
            calendar: {
                editable: false,
                header: {
                    left: 'title',
                    right: 'today prev,next'
                },
                dayClick: function (date) {
                    $scope.calendarClick(date);
                }
            }
        };

        $scope.$parent.$on('$viewContentLoaded', function () {
            $('#calendar td[data-date=\'' + timeFunctions.convertToYMD($scope.$parent.entryDate) + '\']').addClass('selected');
        });

        $scope.calendarClick = function (date) {
            $('#calendar').find('table td').removeClass('selected');
            $(this).addClass('selected');

            $scope.redirectToDate(date);
        };

        $scope.redirectToDate = function (date) {
            $rootScope.$apply(function () {
                $location.path('/date/' + timeFunctions.convertToYMD(date));
            });
        };
    }]);