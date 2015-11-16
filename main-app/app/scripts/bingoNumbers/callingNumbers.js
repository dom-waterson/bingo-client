(function () {
    'use strict';
    angular.module('Tombola.LongPollingService')
        .service('longPolling',['$timeout', 'proxy', 'userModel', 'numberService', function ($timeout, proxy, userModel, numberService) {
            var me = this;
            me.currentNumber = 0;
            me.startNumber = 1;
            me.winnerMessage ='';
            me.numbersToWin = 5;
            me.winnerHasNotBeenFound = true;

            me.startPolling = function() {
                proxy.getBingoNumber(userModel.token, userModel.name, userModel.currentBalance, me.startNumber).then(function(response) {
                    me.currentNumber = response.payload.call;
                    me.startNumber += 1;
                    checkForWinnerfound(response);
                    //TODO: Check for number to colour in and find out how many numbers are left to win.
                    if(me.winnerHasNotBeenFound){
                        $timeout(me.startPolling, 2000);
                    }
                });
            };

            var checkForWinnerfound = function (data) {
                if(data.message === "Line"){
                    numberService.linePrize = false;
                    lineFound(data);
                }
                else if (data.message === 'Winner') {
                    fullHouseFound(data);
                }
            };

            var fullHouseFound = function (data) {
                me.winnerHasNotBeenFound = false;
                me.winnerMessage = "Full house! you have won £" + data.payload.winnerInfo.houseprize;
                userModel.currentBalance += data.payload.winnerInfo.houseprize;
            };

            var lineFound = function (data) {
                me.winnerMessage = "Line Found! you have won £" + data.payload.winnerInfo.lineprize;
                userModel.currentBalance += data.payload.winnerInfo.lineprize;
            };
        }]);
})();
