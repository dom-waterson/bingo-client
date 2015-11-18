(function () {
    'use strict';
    angular.module('Tombola.BingoClient.UserModel')
        .service('userModel', function () {
            var me = this;

            me.clearUser = function (){
                me.name = '';
                me.currentBalance = 0;
                me.ticketBought = false;
            };

            me.createUser = function (name, balance) {
                me.name = name;
                me.currentBalance = balance;
                me.ticketBought = false;
            };

            me.userBoughtTicket = function (updatedBalance) {
                me.currentBalance = updatedBalance;
                me.ticketBought = true;
            };
        });
})();
