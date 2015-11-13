(function () {
    'use strict';
    angular.module('Tombola.BingoClient.NextGameService')
        .service('nextGameService', ['$state', '$interval', 'userModel','proxy', function ($state, $interval, userModel, proxy) {
            var me = this;
            var gameLoop;
            me.timeToGame = 0;

            me.startCounter = function () {
                proxy.nextGame(userModel.token).then(function (response) {
                    var currentDate = new Date();
                    var dateFromApi = new Date(response.payload.start);
                    me.timeToGame = Math.abs(dateFromApi.getTime() - currentDate.getTime());
                    gameLoop = $interval(updateTime, 1000, me.timeToGame);
                });
            };

            var updateTime = function(){
                me.timeToGame-= 1000;
                console.log(me.timeToGame);
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