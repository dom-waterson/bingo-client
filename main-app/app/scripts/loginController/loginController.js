(function () {
    'use strict';
    angular.module('Tombola.BingoClient.LoginController')
        .controller('loginController',['$state', 'proxy', 'userModel', 'nextGameService', 'tokenService', function ($state, proxy, userModel, nextGameService, tokenService) {
            var me = this;
            me.userName = 'drwho';
            me.userPassword = 'tardis123!';

            me.login = function () {
                proxy.login(me.userName, me.userPassword).then(function (response) {
                    if(response.message === 'LoginSuccess'){
                        userModel.createUser(response.payload.user.username, response.payload.user.balance);
                        tokenService.setToken(response.payload.user.token);
                        $state.go('lobby');
                    }
                });
            };

            me.logout = function () {
                proxy.logout(tokenService.getToken()).then(function (response) {
                    if(response.message === 'LogoutSuccess') {
                        userModel.clearUser();
                        tokenService.resetToken();
                        nextGameService.stop();
                        $state.go('login');
                    }
                });
            };

        }]);
})();
