(function () {
    'use strict';
    angular.module('Tombola.BingoClient.ObjectConverter')
        .service('ObjectConverter', function () {
            var me = this;

            me.generateLoginObject = function (response) {
                var loginObject = {
                    name: response.payload.user.username,
                    token: response.payload.user.token,
                    balance: response.payload.user.balance,
                    message: response.message
                };
                return loginObject;
            };

            me.generateNextGameObject = function (response) {
                var nextGameObject = {
                    start: response.payload.start
                };
                return nextGameObject;
            };

            me.generateBuyTicketObject = function (response) {
                var splitTicketString = function (ticketString) {
                        var ticketArray = [
                            [ticketString.slice(0,10)],
                            [ticketString.slice(10,20)],
                            [ticketString.slice(20,30)]
                        ];

                        return ticketArray;
                },
                buyTicketObject = {
                    ticket: splitTicketString(response.payload.card),
                    balance: response.payload.user.balance
                };
                return buyTicketObject;
            };

            me.generateBingoCallObject = function (response) {
                var bingoCallObject = {
                    ball: response.payload.call,
                    message: response.message,
                    winnerInfo: null
                };
                if (response.message === 'Line' || response.message === 'Winner') {
                    bingoCallObject.winnerInfo = response.payload.winnerInfo;
                }
                return bingoCallObject;
            };
        });

})();
