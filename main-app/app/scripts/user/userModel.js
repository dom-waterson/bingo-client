(function () {
    'use strict';
    angular.module('Tombola.BingoClient.UserModel')
        .service('userModel', function () {
            var me = this;
            me.name = '';
            me.currentBalance = '';
            me.token = '';

            me.clearUser = function (){
                me.name = '';
                me.currentBalance = '';
                me.token = '';
            };
        });
})();
