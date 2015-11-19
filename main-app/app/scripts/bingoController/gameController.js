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
                        //bingoModel.getTicket('011722475204365360702637497481233455758302154058881928446789061241507324334876840738576186051132437816395663800818206590104559628214294664710935667287132130687703253151692742547985');
                    });
                }
            };
        }]);
})();
