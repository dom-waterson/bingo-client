(function () {
    'use strict';
    angular.module('Tombola.BingoClient.ObjectConverter')
        .service('objectConverter', function () {
            var me = this;

            me.convert = function (response, call) {
                if(call === 'users/login') {
                     return generateLoginObject(response);
                }
                else if (call === 'users/logout') {
                    return generateLogoutObject(response);
                }
                else if (call === 'game/next') {
                    return generateNextGameObject(response);
                }
                else if (call === 'game/buyticket') {
                    return generateBuyTicketObject(response);
                }
                else if (call === 'game/getcall') {
                    return generateBingoCallObject(response);
                }
                else if (call === 'winnerFound') {
                    return generateWinnerObject(response);
                }
            };

            var generateLoginObject = function (response) {
                var loginObject = {
                    name: response.data.payload.user.username,
                    token: response.data.payload.user.token,
                    balance: response.data.payload.user.balance,
                    message: response.data.message
                };
                return loginObject;
            };

            var generateLogoutObject = function (response) {
                var logoutObject = {
                    message: response.data.message
                };
                return logoutObject;
            };

            var generateNextGameObject = function (response) {
                var nextGameObject = {
                   start: response.data.payload.start
                };
                return nextGameObject;
            };

            var generateBuyTicketObject = function (response) {
                var buyTicketObject = {
                    ticket: response.data.payload.card,
                    balance: response.data.payload.user.balance
                };
                return buyTicketObject;
            };


            var generateBingoCallObject = function (response) {
                var bingoCallObject = {
                    ball: response.data.payload.call,
                    message: response.data.message
                };
                return bingoCallObject;
            };

            var generateWinnerObject = function (response) {
                var bingoCallObject = {
                    ball: response.data.payload.call,
                    message: response.data.message,
                    winnerInfo: response.data.payload.winnerInfo
                };
                return bingoCallObject;
            };
        });
})();
