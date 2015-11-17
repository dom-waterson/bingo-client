(function () {
    'use strict';
    angular.module('Tombola.BingoClient.GameController')
        .controller('gameController',['proxy', 'userModel', 'bingoModel', 'nextGameService', 'longPolling', function (proxy, userModel, bingoModel, nextGameService, longPolling) {
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
                    proxy.buyTicket(userModel.token, userModel.currentBalance, userModel.name).then(function (response) {
                        userModel.userBoughtTicket(response.payload.user.balance);
                        //bingoModel.getTicket(response.payload.card);
                        bingoModel.getTicket('011722475204365360702637497481233455758302154058881928446789061241507324334876840738576186051132437816395663800818206590104559628214294664710935667287132130687703253151692742547985');
                    });
                }
            };
        }]);
})();
