(function () {
    'use strict';
    angular.module('Tombola.BingoClient.GameController')
        .controller('gameController',['proxy', 'userModel', 'bingoModel', function (proxy, userModel, bingoModel) {
            var me = this;

            me.nextGameTime = '';
            me.ticketPrice = '';

            me.nextGame = function () {
                proxy.nextGame(userModel.token).then(function (response) {
                    me.nextGameTime = response.payload.start;
                    me.ticketPrice = response.payload.ticketPrice + 'p';
                });
            };

            me.buyTicket = function () {
                proxy.buyTicket(userModel.token, userModel.currentBalance, userModel.name).then(function (response) {
                    userModel.balance = response.payload.user.balance;
                    bingoModel.ticket = response.payload.card;
                });
            };
        }]);
})();
