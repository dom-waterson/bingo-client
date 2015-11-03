(function () {
    'use strict';
    angular.module('Tombola.BingoClient.BingoTicket')
        .service('bingoModel', function () {
            var me = this;

            me.ticket = '';

            var tickets = [];
            me.bingoStrip = [];

            var createBingoTicketGrid = function () {
                me.ticketGrid = [
                    [null, null,null,null,null,null,null,null,null],
                    [null, null,null,null,null,null,null,null,null],
                    [null, null,null,null,null,null,null,null,null]
                ];
            };

            me.getTicket = function () {
                generateTickets(me.ticket);
                for(var i = 0; i < tickets.length; i++){
                    createBingoTicketGrid();
                    splitingNumbersUp(tickets[i]);
                }
            };

            var generateTickets = function (ticket) {
                var start = 0;
                var end = 30;
                for(start; start < ticket.length; start += 30){
                    tickets.push(ticket.slice(start, end));
                    end += 30;
                }
            };

            var splitingNumbersUp = function (strTicket) {
                var numStart = 0;
                var numEnd = 2;
                for (var j =0; j < 15; j++){
                    sortingTicket(strTicket.slice(numStart,numEnd));
                    numStart += 2;
                    numEnd += 2;
                }
                me.bingoStrip.push(me.ticketGrid);
            };

            var checkRowForFiveNumbers = function (row) {
                var count = 0;
                for (var i = 0; i < 9; i++){
                    if(me.ticketGrid[row][i] !== null) {
                        count += 1;
                    }
                }
                if(count === 5){
                    return false;
                }
                else{
                    return true;
                }
            };

            var insertNumberIntobingoTicket = function (column, numberFromString) {
                if(me.ticketGrid[0][column] === null && checkRowForFiveNumbers(0)){
                    me.ticketGrid[0][column] = numberFromString;
                }
                else if (me.ticketGrid[1][column] === null && checkRowForFiveNumbers(1)) {
                    me.ticketGrid[1][column] = numberFromString;
                }
                else {
                    me.ticketGrid[2][column] = numberFromString;
                }
            };

            var sortingTicket = function (stringTicket) {
                var numberFromString = parseInt(stringTicket);
                if(numberFromString < 10 ){
                    insertNumberIntobingoTicket(0, numberFromString);
                }
                if(numberFromString >= 10 && numberFromString < 20) {
                    insertNumberIntobingoTicket(1, numberFromString);
                }
                if(numberFromString >= 20 &&  numberFromString < 30) {
                    insertNumberIntobingoTicket(2, numberFromString);
                }
                if(numberFromString >= 30 &&  numberFromString < 40) {
                    insertNumberIntobingoTicket(3, numberFromString);
                }
                if(numberFromString >= 40 &&  numberFromString < 50) {
                    insertNumberIntobingoTicket(4, numberFromString);
                }
                if(numberFromString >= 50 &&  numberFromString < 60) {
                    insertNumberIntobingoTicket(5, numberFromString);
                }
                if(numberFromString >= 60 &&  numberFromString < 70) {
                    insertNumberIntobingoTicket(6, numberFromString);
                }
                if(numberFromString >= 70 &&  numberFromString < 80) {
                    insertNumberIntobingoTicket(7, numberFromString);
                }
                if(numberFromString >= 80 &&  numberFromString < 90) {
                    insertNumberIntobingoTicket(8, numberFromString);
                }
            };
        });
})();
