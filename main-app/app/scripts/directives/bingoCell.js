(function () {
    'use strict';
    angular.module('Tombola.BingoClient')
        .directive('bingoCell', function () {
            return {
                restrict: 'E',
                template: function (attr, element) {
                    //return'<div class="bingoCell textCenter cellBorder {{strip['+element.stripRow+']['+element.stripColumn+'].cssClass}}">{{strip['+element.stripRow+']['+element.stripColumn+'].bingoNumber}}</div>';
                    return'<div class="bingoCell textCenter cellBorder">{{game.bingo.ticket.lines['+element.stripRow+'].cells['+element.stripColumn+'].bingoNumber}}</div>';
                }
            };
        });
})();

