(function () {
    'use strict';
    angular.module('Tombola.BingoClient.WinnerChecking')
        .service('WinnerChecking', ['UserModel', 'NumberService', function (UserModel, NumberService) {
            var me = this;
            me.houseNotFound = true;
            me.winnerPrize = 0;
            me.numbersToWin = 5;

            me.checkForWinnerfound = function (data) {
                if (data.message === "Line") {
                    lineFound(data);
                }
                else if (data.message === 'Winner') {
                    fullHouseFound(data);
                }

            };

            var fullHouseFound = function (data) {
                me.houseNotFound = false;
                me.winnerPrize = data.winnerInfo.houseprize;
                UserModel.currentBalance += data.winnerInfo.houseprize;
            };

            var lineFound = function (data) {
                NumberService.linePrize = false;
                me.winnerPrize = data.winnerInfo.lineprize;
                UserModel.currentBalance += data.winnerInfo.lineprize;
            };
        }]);
})();
