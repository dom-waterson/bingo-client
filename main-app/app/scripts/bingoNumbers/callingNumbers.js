(function () {
    'use strict';
    angular.module('Tombola.BingoNumberCalling')
        .service('BingoNumberCalling',
        ['$interval', 'Proxy', 'UserModel', 'NumberService', 'WinnerChecking', function ($interval, Proxy, UserModel,
                                                                                         NumberService,
                                                                                         WinnerChecking) {
            var me = this;
            me.currentNumber = 0;
            me.startNumber = 1;
            var bingoNumberInterval;

            me.startPolling = function () {
                Proxy.getBingoNumber(UserModel.token, UserModel.name, UserModel.currentBalance,
                    me.startNumber).then(function (response) {
                    me.currentNumber = response.payload.call;
                    me.startNumber += 1;
                    WinnerChecking.checkForWinnerfound(response);
                    //TODO: Check for number to colour in and find out how many numbers are left to win.
                    bingoNumberInterval = $interval(checking, 2000, 1);
                });
            };

            var checking = function () {
                if (!WinnerChecking.houseNotFound || me.startNumber > 90) {
                    $interval.cancel(bingoNumberInterval);
                }
                else {
                    me.startPolling();
                }
            };
        }]);
})();
