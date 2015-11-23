(function () {
    'use strict';
    angular.module('Tombola.BingoClient.BingoTicket')
        .service('BingoModel', function () {
            var me = this;
            me.tickets = [];
            me.bingoStrip = [];

            var clearOldTickets = function () {
                me.tickets = [];
                me.bingoStrip = [];
            };

            me.getTicket = function (ticketFromServer) {
                clearOldTickets();
                generateTickets(ticketFromServer);
                for (var i = 0; i < me.tickets.length; i++) {
                    createBingoTicketGrid();
                    splitingNumbersUp(me.tickets[i]);
                }
            };

            var BingoCell = function () {
                this.bingoNumber = null;
                this.marked = "unmarked";
                this.counted = false;
            };

            var TicketInfo = function () {
                this.row1Marked = 0;
                this.row2Marked = 0;
                this.row3Marked = 0;
                this.numbersToWin = 5;
            };

            var createBingoTicketGrid = function () {
                me.ticketGrid = [
                    [new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell(),
                        new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell()],
                    [new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell(),
                        new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell()],
                    [new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell(),
                        new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell()],
                    [new TicketInfo()]
                ];
            };


            var generateTickets = function (ticket) {
                var start = 0;
                var end = 30;
                for (start; start < ticket.length; start += 30) {
                    me.tickets.push(ticket.slice(start, end));
                    end += 30;
                }
            };

            var splitingNumbersUp = function (strTicket) {
                var numStart = 0;
                var numEnd = 2;
                for (var j = 0; j < 15; j++) {
                    sortingTicket(strTicket.slice(numStart, numEnd));
                    numStart += 2;
                    numEnd += 2;
                }
                me.bingoStrip.push(me.ticketGrid);
            };

            var checkRowForFiveNumbers = function (row) {
                var count = 0;
                for (var i = 0; i < 9; i++) {
                    if (me.ticketGrid[row][i].bingoNumber !== null) {
                        count += 1;
                    }
                }
                if (count === 5) {
                    return false;
                }
                else {
                    return true;
                }
            };

            var insertNumberIntobingoTicket = function (column, numberFromString) {

                if (me.ticketGrid[0][column].bingoNumber === null && checkRowForFiveNumbers(0)) {
                    me.ticketGrid[0][column].bingoNumber = numberFromString;
                }
                else if (me.ticketGrid[1][column].bingoNumber === null && checkRowForFiveNumbers(1)) {
                    me.ticketGrid[1][column].bingoNumber = numberFromString;
                }
                else {
                    me.ticketGrid[2][column].bingoNumber = numberFromString;
                }
            };

            var sortingTicket = function (stringTicket) {
                var numberFromString = parseInt(stringTicket);
                if (numberFromString < 10) {
                    insertNumberIntobingoTicket(0, numberFromString);
                }
                if (numberFromString >= 10 && numberFromString < 20) {
                    insertNumberIntobingoTicket(1, numberFromString);
                }
                if (numberFromString >= 20 && numberFromString < 30) {
                    insertNumberIntobingoTicket(2, numberFromString);
                }
                if (numberFromString >= 30 && numberFromString < 40) {
                    insertNumberIntobingoTicket(3, numberFromString);
                }
                if (numberFromString >= 40 && numberFromString < 50) {
                    insertNumberIntobingoTicket(4, numberFromString);
                }
                if (numberFromString >= 50 && numberFromString < 60) {
                    insertNumberIntobingoTicket(5, numberFromString);
                }
                if (numberFromString >= 60 && numberFromString < 70) {
                    insertNumberIntobingoTicket(6, numberFromString);
                }
                if (numberFromString >= 70 && numberFromString < 80) {
                    insertNumberIntobingoTicket(7, numberFromString);
                }
                if (numberFromString >= 80 && numberFromString <= 90) {
                    insertNumberIntobingoTicket(8, numberFromString);
                }
            };
        });
})();
