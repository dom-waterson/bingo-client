(function () {
    'use strict';
    angular.module('Tombola.BingoClient.BingoTicket')
        .service('BingoModel', function () {
            var me = this;

            var BingoCell = function () {
                var me = this;
                me.bingoNumber;
                me.called;
                me.isToGo = function(){
                    if(bingoNumber){
                        return !called;
                    }
                    return false;
                };

                me.addNumber = function(number){
                    me.bingoNumber = number;
                };
            };


            var TicketLine = function () {
                var me = this;

                me.cells =  [new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell(),
                    new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell()];

                me.getToGo = function(){
                    //TODO: Iterate over the cells, summing to the
                };

                me.makeCall = function(call){
                    //TODO: check cell in relevant column
                };

                me.isCalled = function(){
                    //TODO: getToGo === 0;
                };

                me.addNumber = function(number){
                    if(number.charAt(0) !== '9'){
                        me.cells[number.charAt(0)].addNumber(number);
                    } else {
                        me.cells[8].addNumber(number);
                    }
                };
            };

            var BingoTicket = function(){
                var me = this;

                me.lines = [new TicketLine(),
                            new TicketLine(),
                            new TicketLine()];

                me.getToGo = function(){
                    //TODO: either iterate over lines if there is a house prize to be won,
                    // or sum all lines togo values;
                };

                me.makeCall = function(call){
                    //TODO: Iterate over lines, calling
                };

                me.fillTicket = function(numbers){
                    var row; var start = 0, end = 2;
                    for(row in numbers){
                        var string = numbers[row].toString();
                        for(var i = 0; i < 5; i++){
                            me.lines[row].addNumber(string.slice(start,end));
                            start += 2;
                            end += 2;
                        }
                        start = 0;
                        end = 2;
                    }
                };
            };

            me.getTicket = function (ticketArray) {
                me.ticket = new BingoTicket();
                me.ticket.fillTicket(ticketArray);
            };
        });
})();
