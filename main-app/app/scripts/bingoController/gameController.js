(function () {
    'use strict';
    angular.module('Tombola.BingoClient.GameController')
        .controller('gameController',['$state', 'proxy', 'userModel', 'bingoModel', function ($state, proxy, userModel, bingoModel) {
            var me = this;

            me.nextGameTime = '';
            me.ticketPrice = '';
            me.ticket = [];

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
                    bingoModel.getTicket();
                    me.ticket = bingoModel.ticketGrid;
                    $state.go('playing');
                });
            };
        }]);
})();
