(function () {
    'use strict';
    angular.module('Tombola.NumberService')
        .service('numberService',['bingoModel', function (bingoModel) {
            var me = this;
            me.linePrize = true;

            me.findNumberInTicket = function (calledNumber) {
                var i, row, col, bingoCell;
                for(i = 0; i < bingoModel.bingoStrip.length; i++){
                    for (row = 0; row < 3; row++){
                        for(col = 0; col < 9; col++){
                            bingoCell = bingoModel.bingoStrip[i][row][col];
                            if(bingoCell.bingoNumber === calledNumber){
                                bingoCell.marked = 'checked';
                                findHowManyNumberAreLeftForPrize(bingoCell, row, i);
                            }
                        }
                    }
                }
            };

            var findHowManyNumberAreLeftForPrize = function (bingoCell, row, i){
                if(row === 0 && !bingoCell.counted){
                    bingoCell.counted = true;
                    bingoModel.bingoStrip[i][3][0].row1Marked += 1;

                }
                else if (row === 1 && !bingoCell.counted){
                    bingoCell.counted = true;
                    bingoModel.bingoStrip[i][3][0].row2Marked += 1;

                }
                else if (row === 2 && !bingoCell.counted){
                        bingoCell.counted = true;
                    bingoModel.bingoStrip[i][3][0].row3Marked += 1;
                }
                updateNumbersLeftToWin(bingoModel.bingoStrip[i]);
            };

            var updateNumbersLeftToWin = function (ticketGrid) {
                var first, second, third;
                first = ticketGrid[3][0].row1Marked;
                second = ticketGrid[3][0].row2Marked;
                third = ticketGrid[3][0].row3Marked;
                if(me.linePrize){
                    ticketGrid[3][0].numbersToWin = 5 - Math.max(first,second,third);
                }
                else {
                    ticketGrid[3][0].numbersToWin = 15 - (first + second + third);
                }
            };
        }]);
})();