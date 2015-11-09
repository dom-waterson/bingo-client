(function () {
    'use strict';
   angular.module('Tombola.NumberService')
       .service('numberService',['bingoModel', function (bingoModel) {
           var me = this;
           me.linePrize = true;

           me.numbersToWin = 5;

           me.findNumberInTicket = function (calledNumber) {
               var i, row, col;
               for(i = 0; i < bingoModel.bingoStrip.length; i++){
                   for (row = 0; row < 3; row++){
                        for(col = 0; col < 9; col++){
                            if(bingoModel.bingoStrip[i][row][col] === calledNumber){
                                var element = angular.element('#'+row+col);
                                element.addClass('checked');
                            }
                        }
                   }
               }
           };


           me.findHowManyNumberAreLeftForPrize = function (){
                   var i, row, col;
                   var firstRow =0, secondRow =0, thirdRow =0;
                   for(i = 0; i < bingoModel.bingoStrip.length; i++){
                       for (row = 0; row < 3; row++){
                           for(col = 0; col < 9; col++){
                               var element = angular.element('#'+row+col);
                               if(element.hasClass('checked')){
                                    if(row === 0){
                                        firstRow += 1;
                                    }
                                   else if (row === 1){
                                        secondRow += 1;
                                    }
                                   else {
                                        thirdRow += 1;
                                    }
                               }
                           }
                       }
                   }
               if(me.linePrize){
                   numberLeftForLinePrize(firstRow, secondRow,thirdRow);
               }
               else {
                   numberLeftForFullHouse(firstRow, secondRow,thirdRow);
               }
               return  me.numbersToWin;
           };

           var numberLeftForLinePrize = function (firstRow, secondRow, thirdRow) {
               if(firstRow > secondRow && firstRow > thirdRow){
                   me.numbersToWin = 5 - firstRow;
               }
               else if (secondRow > firstRow && secondRow > thirdRow) {
                   me.numbersToWin = 5 - secondRow;
               }
               else if (thirdRow > firstRow && thirdRow > secondRow) {
                       me.numbersToWin = 5 - thirdRow;
                   }
               else if (firstRow === 0 && secondRow === 0 && thirdRow === 0) {
                       me.numbersToWin = 5;
                   }
               else {
                           me.numbersToWin = 5 - firstRow;
                       }
           };

           var numberLeftForFullHouse = function (firstRow, secondRow, thirdRow) {
               var total = 15;

               var checkedTotal = firstRow + secondRow + thirdRow;

               me.numbersToWin = total - checkedTotal;
           };
       }]);
})();