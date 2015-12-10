(function () {
    'use strict';
    angular.module('Tombola.BingoClient.BingoTicket')
        .service('TicketSplittingService', function (BingoModel) {
            var me = this;
            var ticketsArray = [];
            me.bingoStrip = [];

            me.splitTicketString = function (ticketString) {
                var start = 0,
                    end = 30;
                for(start; start < ticketString.length; start += 30){
                    ticketsArray.push(ticketString.slice(start, end));
                    end += 30;
                }
            };
        });
})();