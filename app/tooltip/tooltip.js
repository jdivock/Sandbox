'use strict';
var app = angular.module('app', []);

app.controller('bodyCtrl', function() {

});

app.directive('tooltip', function() {
    return {
        restrict: 'EA',
        scope: {
            text: '@'
        },
        priority: 1,
        template: '<div class="tooltip-container" ng-show="state.display">' + 
        '<span class="tooltip-close" ng-click="state.display = false; $event.stopPropagation();">X</span>' + 
        '<p>{{text}}</p></div>',
        link: function(scope, element, attrs) {
            scope.state = {
                display: false,
            };

            element.on('click', function(e) {

                console.log('here', scope.state.display);
                scope.state.display = true;
                scope.$apply();
                // e.preventDefault();
            });
        }
    };
});
