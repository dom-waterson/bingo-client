(function () {
    'use strict';
    angular.module('Tombola.BingoClient.LoginController')
        .controller('loginController',['proxy', function (proxy) {
            var me = this;
            var token;
            me.message = '';

            me.login = function () {
                proxy.login('drwho', 'tardis123!').then(function (response) {
                    token = response.payload.user.token;
                    me.message = response.message;
                });
            };

            me.logout = function () {
                proxy.logout(token).then(function (response) {
                    me.message = response.message;
                });
            };

        }]);
})();
