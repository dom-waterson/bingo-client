(function () {
    'use strict';
    angular.module('Tombola.BingoClient.LoginController')
        .controller('LoginController',
        ['$state', 'Proxy', 'UserModel', 'NextGameService', function ($state, Proxy, UserModel, NextGameService) {
            var me = this;
            me.userName = 'drwho';
            me.userPassword = 'tardis123!';

            me.login = function () {
                Proxy.login(me.userName, me.userPassword).then(function (response) {
                    if (response.message === 'LoginSuccess') {
                        UserModel.createUser(response.payload.user.username, '2000', response.payload.user.token);
                        $state.go('lobby');
                    }
                });
            };

            me.logout = function () {
                Proxy.logout(UserModel.token).then(function (response) {
                    if (response.message === 'LogoutSuccess') {
                        UserModel.clearUser();
                        NextGameService.stop();
                        $state.go('login');
                    }
                });
            };

        }]);
})();
