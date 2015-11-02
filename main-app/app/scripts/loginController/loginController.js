(function () {
    'use strict';
    angular.module('Tombola.BingoClient.LoginController')
        .controller('loginController',['proxy', 'userModel', function (proxy, userModel) {
            var me = this;
            me.message = '';

            me.login = function () {
                proxy.login('drwho', 'tardis123!').then(function (response) {
                    userModel.token = response.payload.user.token;
                    userModel.currentBalance = response.payload.user.balance;
                    userModel.name = response.payload.user.username;
                    me.message = response.message;
                });
            };

            me.logout = function () {
                proxy.logout(userModel.token).then(function (response) {
                    me.message = response.message;
                    userModel.clearUser();
                });
            };

        }]);
})();
