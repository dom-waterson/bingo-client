(function () {
    'use strict';
    angular.module('Tombola.BingoClient.BingoTicket')
        .service('BingoModel', function (WinnerChecking) {
            var me = this;

            var BingoCell = function () {
                var me = this;
                me.bingoNumber;
                me.called;
                me.addNumber = function(number){
                    me.bingoNumber = number;
                };
            };


            var TicketLine = function () {
                var me = this;
                me.numbersCounted = 0;

                me.cells =  [new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell(),
                    new BingoCell(), new BingoCell(), new BingoCell(), new BingoCell()];

                me.getToGo = function(){
                    return me.numbersCounted;
                };

                me.makeCall = function(call){
                    var col  = call / 10;
                    if(Math.floor(col) < 9){
                        if(me.cells[Math.floor(col)].bingoNumber === call){
                            me.cells[Math.floor(col)].called = true;
                            me.isCalled();
                        }
                    }else {
                        if(me.cells[8].bingoNumber === call){
                            me.cells[8].called = true;
                            me.isCalled();
                        }
                    }
                };

                me.isCalled = function(){
                    me.numbersCounted++;
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
                    var firstLineTotal, secondLineTotal, thirdLineTotal;
                    firstLineTotal = me.lines[0].getToGo();
                    secondLineTotal = me.lines[1].getToGo();
                    thirdLineTotal = me.lines[2].getToGo();

                    if(WinnerChecking.lineNotFound) {
                        return 5 - Math.max(firstLineTotal, secondLineTotal, thirdLineTotal);
                    }else {
                        return 15 - (firstLineTotal + secondLineTotal + thirdLineTotal);
                    }
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
