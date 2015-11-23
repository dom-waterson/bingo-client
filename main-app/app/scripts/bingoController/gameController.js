(function () {
    'use strict';
    angular.module('Tombola.BingoClient.GameController')
        .controller('GameController',
        ['Proxy', 'UserModel', 'BingoModel', 'NextGameService', 'BingoNumberCalling', 'WinnerChecking', function (Proxy,
                                                                                                                  UserModel,
                                                                                                                  BingoModel,
                                                                                                                  NextGameService,
                                                                                                                  BingoNumberCalling,
                                                                                                                  WinnerChecking) {
            var me = this;
            me.user = UserModel;
            me.bingo = BingoModel;
            me.nextGameModel = NextGameService;
            me.numberCalling = BingoNumberCalling;
            me.prizeNumbers = WinnerChecking;

            me.nextGame = function () {
                NextGameService.startCounter();
            };

            me.buyTicket = function () {
                if (!UserModel.ticketBought) {
                    Proxy.buyTicket(UserModel.token, UserModel.currentBalance,
                        UserModel.name).then(function (response) {
                        UserModel.userBoughtTicket(response.payload.user.balance);
                        BingoModel.getTicket(response.payload.card);
                    });
                }
            };
        }]);
})();
