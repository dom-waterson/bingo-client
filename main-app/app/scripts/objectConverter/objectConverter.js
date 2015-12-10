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
                    var start = 0,
                        end = 30;
                    for (start; start < ticketString.length; start += 30) {
                        ticketsArray.push(ticketString.slice(start, end));
                        end += 30;
                    }
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
