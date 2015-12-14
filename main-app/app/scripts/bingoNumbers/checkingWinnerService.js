(function () {
    'use strict';
    angular.module('Tombola.BingoClient.WinnerChecking')
        .service('WinnerChecking', ['UserModel', function (UserModel) {
            var me = this;
            me.lineNotFound = true;
            me.winnerPrize = 0;

            me.checkForWinnerfound = function (data) {
                if (data.message === "Line") {
                    lineFound(data);
                }
                else if (data.message === 'Winner') {
                    fullHouseFound(data);
                }

            };

            var fullHouseFound = function (data) {
                me.winnerPrize = data.winnerInfo.houseprize;
                UserModel.currentBalance += data.winnerInfo.houseprize;
            };

            var lineFound = function (data) {
                me.lineNotFound = false;
                me.winnerPrize = data.winnerInfo.lineprize;
                UserModel.currentBalance += data.winnerInfo.lineprize;
            };
        }]);
})();
