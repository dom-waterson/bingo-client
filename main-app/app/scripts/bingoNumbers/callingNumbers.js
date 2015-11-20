(function () {
    'use strict';
    angular.module('Tombola.LongPollingService')
        .service('longPolling',['$timeout', 'proxy', 'userModel', 'numberService', 'tokenService', function ($timeout, proxy, userModel, numberService, tokenService) {
            var me = this;
            me.currentNumber = 0;
            me.startNumber = 1;
            me.winnerMessage ='';
            me.numbersToWin = 5;
            me.winnerHasNotBeenFound = true;

            me.startPolling = function() {
                proxy.getBingoNumber(tokenService.getToken(), userModel.name, userModel.currentBalance, me.startNumber).then(function(response) {
                    me.currentNumber = response.payload.call;
                    me.startNumber += 1;
                    checkForWinnerfound(response);
                    numberService.findNumberInTicket(me.currentNumber);
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
