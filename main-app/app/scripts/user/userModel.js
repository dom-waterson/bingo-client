(function () {
    'use strict';
    angular.module('Tombola.BingoClient.UserModel')
        .service('userModel', function () {
            var me = this;
            me.name = '';
            me.currentBalance = 0;
            me.token = '';
            me.ticketBought = false;

            me.clearUser = function (){
                me.name = '';
                me.currentBalance = 0;
                me.token = '';
                me.ticketBought = false;
            };
        });
})();
