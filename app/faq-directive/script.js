// Code goes here
'use strict';

angular.module('faqs', []).
directive('faqs', function() {
    return {
        restrict: 'E',
        controller: function($scope, $element) {
            // If only one could be open at a time I'd put some controlling
            // code here
        }
    };
}).
directive('faq', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope, $element) {
            this.toggleAnswer = function() {
                angular.forEach(this.nodes, function(val) {
                    val.display = !val.display;
                });
            };
            this.nodes = [];
            this.register = function(scope) {
                this.nodes.push(scope);
            };
        },
        template: '<div ng-transclude></div>'
    };
}).
directive('question', function() {
    return {
        require: '^faq',
        restrict: 'E',
        transclude: true,
        scope: {},
        link: function(scope, element, attrs, faqCtrl) {
            scope.display = false;
            faqCtrl.register(scope);
            scope.toggleAnswer = function() {
                faqCtrl.toggleAnswer(scope);
            };
        },
        template: '<div ng-click=toggleAnswer()>\
            <i ng-class="{\'fa-minus-circle\': display, \'fa-plus-circle\': !display}" class="fa"></i>\
            <span ng-transclude></span>\
            </div>'
    };
}).
directive('answer', function() {
    return {
        restrict: 'E',
        require: '^faq',
        scope: {},
        transclude: true,
        link: function(scope, element, attr, faqCtrl) {
            scope.display = false;
            faqCtrl.register(scope);
        },
        template: '<div ng-transclude ng-show="display"></div>'
    };
});
