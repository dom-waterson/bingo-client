(function () {
    'use strict';
    angular.module('Tombola.BingoClient')
        .directive('bingoTicket', function (){
            return {
                restrict : 'E',
                templateUrl: 'html/bingoTicket.html'
            };
        });
})();
