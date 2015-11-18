(function () {
    'use strict';
    angular.module('Tombola.BingoClient.NextGameService')
        .service('nextGameService', ['$state', '$interval', 'userModel','proxy', 'tokenService', function ($state, $interval, userModel, proxy, tokenService) {
            var me = this;
            var gameLoop;
            me.timeToGame = 0;

            me.startCounter = function () {
                proxy.nextGame(tokenService.getToken()).then(function (response) {
                    var currentDate = new Date();
                    var dateFromApi = new Date(response.start);
                    me.timeToGame = Math.abs(dateFromApi.getTime() - currentDate.getTime());
                    gameLoop = $interval(updateTime, 1000, me.timeToGame);
                });
            };

            var updateTime = function(){
                me.timeToGame-= 1000;
                if(me.timeToGame < 1000){
                    me.stop();
                    if(userModel.ticketBought){
                        $state.go('playing');
                        userModel.ticketBought = false;
                        return;
                    }
                    me.startCounter();
                }
            };

            me.stop = function () {
              $interval.cancel(gameLoop);
            };
        }]);
})();
