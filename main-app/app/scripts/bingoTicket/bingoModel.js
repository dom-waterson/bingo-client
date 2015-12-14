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
                    var col  = call / 10;
                    if(Math.floor(col) < 9){
                        if(me.cells[Math.floor(col)].bingoNumber === call){
                            console.log("found match");
                            me.cells[Math.floor(col)].called = true;
                        }
                    }else {
                        if(me.cells[8].bingoNumber === call){
                            me.cells[8].called = true;
                        }
                    }
                };

                me.isCalled = function(){
                    //TODO: getToGo === 0;
                };

                me.addNumber = function(number){
                    var col  = number / 10;
                    if(Math.floor(col) < 9){
                        me.cells[Math.floor(col)].addNumber(number);
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
                    var line;
                    for(line in me.lines){
                        me.lines[line].makeCall(call);
                    }
                };

                me.fillTicket = function(numbers){
                    var row; var start = 0, end = 2;
                    for(row in numbers){
                        var string = numbers[row].toString();
                        for(var i = 0; i < 5; i++){
                            me.lines[row].addNumber(parseInt(string.slice(start,end)));
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
