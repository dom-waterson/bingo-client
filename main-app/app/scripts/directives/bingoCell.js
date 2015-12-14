(function () {
    'use strict';
    angular.module('Tombola.BingoClient')
        .directive('bingoCell', function () {
            return {
                restrict: 'E',
                template: function (attr, element) {
                    return'<div ng-class="{checked : game.bingo.ticket.lines['+element.stripRow+'].cells['+element.stripColumn+'].called}" class="bingoCell textCenter cellBorder">{{game.bingo.ticket.lines['+element.stripRow+'].cells['+element.stripColumn+'].bingoNumber}}</div>';
                }
            };
        });
})();

