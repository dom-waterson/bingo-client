(function () {
    'use strict';
    angular.module('Tombola.BingoClient.GameController')
        .controller('gameController',['proxy', 'userModel', 'bingoModel', 'nextGameService', 'longPolling', 'tokenService', function (proxy, userModel, bingoModel, nextGameService, longPolling, tokenService) {
            var me = this;
            me.user = userModel;
            me.bingo = bingoModel;
            me.nextGameModel = nextGameService;
            me.longPollingService = longPolling;

            me.nextGame = function () {
                nextGameService.startCounter();
            };

            me.buyTicket = function () {
                if(!userModel.ticketBought){
                    proxy.buyTicket(tokenService.getToken(), userModel.currentBalance, userModel.name).then(function (response) {
                        userModel.userBoughtTicket(response.balance);
                        bingoModel.getTicket(response.ticket);
                    });
                }
            };
        }]);
})();
