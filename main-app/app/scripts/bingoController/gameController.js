(function () {
    'use strict';
    angular.module('Tombola.BingoClient.GameController')
        .controller('gameController',['$scope', '$timeout', 'proxy', 'userModel', 'bingoModel', 'nextGameService', function ($scope, $timeout, proxy, userModel, bingoModel, nextGameService) {
            var me = this;
            me.user = userModel;
            me.ticketPrice = '';
            me.bingoStrip = [];
            $scope.nextGameModel = nextGameService;

            me.nextGame = function () {
                proxy.nextGame(userModel.token).then(function (response) {
                    me.ticketPrice = response.payload.ticketPrice;
                    nextGameService.startCounter(response.payload.start);
                });
            };

            me.buyTicket = function () {
                if(!userModel.ticketBought){
                    proxy.buyTicket(userModel.token, userModel.currentBalance, userModel.name).then(function (response) {
                        me.bingoStrip = [];
                        bingoModel.bingoStrip = [];
                        bingoModel.tickets = [];
                        userModel.currentBalance = response.payload.user.balance;
                        //userModel.currentBalance -= 10;
                        userModel.ticketBought = true;
                        bingoModel.ticket = response.payload.card;
                        bingoModel.getTicket();
                        me.bingoStrip = bingoModel.bingoStrip;
                    });
                }
            };
        }]);
})();
