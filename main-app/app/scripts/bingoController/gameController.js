(function () {
    'use strict';
    angular.module('Tombola.BingoClient.GameController')
        .controller('GameController',
        ['Proxy', 'UserModel', 'BingoModel', 'NextGameService', 'BingoNumberCalling', 'WinnerChecking', 'ObjectConverter', function (Proxy,
                                                                                                                                     UserModel,
                                                                                                                                     BingoModel,
                                                                                                                                     NextGameService,
                                                                                                                                     BingoNumberCalling,
                                                                                                                                     WinnerChecking,
                                                                                                                                     ObjectConverter) {
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
                    Proxy.buyTicket(UserModel.currentBalance,
                        UserModel.name).then(function (response) {
                            var buyTicketObject = ObjectConverter.generateBuyTicketObject(response);
                            UserModel.userBoughtTicket(buyTicketObject.balance);
                            BingoModel.getTicket(buyTicketObject.ticket);
                            //console.log("coming from game controller" + buyTicketObject.ticket);
                            BingoNumberCalling.setToDefault();
                            WinnerChecking.houseNotFound = true;
                        });
                }
            };
        }]);
})();
