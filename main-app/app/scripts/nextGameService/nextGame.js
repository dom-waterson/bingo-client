(function () {
    'use strict';
    angular.module('Tombola.BingoClient.NextGameService')
        .service('nextGameService', ['$state', '$interval', 'userModel','proxy', function ($state, $interval, userModel, proxy) {
            var me = this;

            me.timeToGame = 0;
            var gameLoop;

            me.startCounter = function (time) {
                var currentDate = new Date();
                var dateFromApi = new Date(time);
                var timeDiff = Math.abs(dateFromApi.getTime() - currentDate.getTime());
                me.timeToGame = (timeDiff/1000).toFixed(0);
                gameLoop = $interval(me.updateTime, 1000, me.timeToGame);
            };

            me.updateTime = function () {
                me.timeToGame -= 1;
                if(me.timeToGame === 0){
                    checkTicketPurchased();
                }
            };

            var checkTicketPurchased = function () {
                if(userModel.ticketBought){
                    $state.go('playing');
                    userModel.ticketBought = false;
                }
                else {
                    proxy.nextGame(userModel.token).then(function (response) {
                        me.startCounter(response.payload.start);
                    });
                }
            };

            me.stop = function () {
              $interval.cancel(gameLoop);
            };
        }]);
})();
