(function () {
    'use strict';
    angular.module('Tombola.BingoClient.UserModel')
        .service('UserModel', function () {
            var me = this;

            me.clearUser = function () {
                me.name = '';
                me.currentBalance = 0;
                me.token = '';
                me.ticketBought = false;
            };

            me.createUser = function (name, balance, token) {
                me.name = name;
                me.currentBalance = balance;
                me.token = token;
                me.ticketBought = false;
            };

            me.userBoughtTicket = function (updatedBalance) {
                me.currentBalance = updatedBalance;
                me.ticketBought = true;
            };
        });
})();
