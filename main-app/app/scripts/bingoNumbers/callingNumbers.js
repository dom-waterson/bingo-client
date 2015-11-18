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
                    me.currentNumber = response.ball;
                    me.startNumber += 1;
                    checkForWinnerfound(response);
                    numberService.findNumberInTicket(me.currentNumber);
                    if(me.winnerHasNotBeenFound){
                        $timeout(me.startPolling, 500);
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
                me.winnerMessage = "Full house! you have won £" + data.winnerInfo.houseprize;
                userModel.currentBalance += data.winnerInfo.houseprize;
            };

            var lineFound = function (data) {
                me.winnerMessage = "Line Found! you have won £" + data.winnerInfo.lineprize;
                userModel.currentBalance += data.winnerInfo.lineprize;
            };
        }]);
})();
