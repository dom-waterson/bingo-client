(function () {
    'use strict';
    angular.module('Tombola.BingoClient.GameController')
        .controller('gameController',['proxy', 'userModel', 'bingoModel', 'nextGameService', function (proxy, userModel, bingoModel, nextGameService) {
            var me = this;
            me.user = userModel;
            me.bingo = bingoModel;
            me.nextGameModel = nextGameService;

            me.nextGame = function () {
                nextGameService.startCounter();
            };

            me.buyTicket = function () {
                if(!userModel.ticketBought){
                    proxy.buyTicket(userModel.token, userModel.currentBalance, userModel.name).then(function (response) {
                        userModel.userBoughtTicket(response.payload.user.balance);
                        bingoModel.getTicket(response.payload.card);
                    });
                }
            };
        }]);
})();
