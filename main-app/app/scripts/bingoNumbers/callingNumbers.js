(function () {
    'use strict';
    angular.module('Tombola.BingoNumberCalling')
        .service('BingoNumberCalling',
        ['$interval', 'Proxy', 'UserModel', 'NumberService', 'WinnerChecking', 'ObjectConverter', function ($interval,
                                                                                                            Proxy,
                                                                                                            UserModel,
                                                                                                            NumberService,
                                                                                                            WinnerChecking,
                                                                                                            ObjectConverter) {
            var me = this;
            me.currentNumber = 0;
            me.startNumber = 1;
            var bingoNumberInterval;

            me.startPolling = function () {
                Proxy.getBingoNumber(UserModel.name, UserModel.currentBalance,
                    me.startNumber).then(function (response) {
                        var numberCallingObject = ObjectConverter.generateBingoCallObject(response);
                        me.currentNumber = numberCallingObject.ball;
                        me.startNumber += 1;
                        WinnerChecking.checkForWinnerfound(numberCallingObject);
                        //TODO: Check for number to colour in and find out how many numbers are left to win.
                        bingoNumberInterval = $interval(checking, 500, 1);
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

            me.setToDefault = function () {
                me.currentNumber = 0;
                me.startNumber = 1;
            };
        }]);
})();
