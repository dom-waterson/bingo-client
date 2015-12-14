(function () {
    'use strict';
    angular.module('Tombola.BingoNumberCalling')
        .service('BingoNumberCalling',
        ['$interval', 'Proxy', 'UserModel', 'WinnerChecking', 'ObjectConverter', 'BingoModel', function ($interval,
                                                                                                            Proxy,
                                                                                                            UserModel,
                                                                                                            WinnerChecking,
                                                                                                            ObjectConverter,
                                                                                                            BingoModel) {
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
                        BingoModel.ticket.makeCall(me.currentNumber);
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
