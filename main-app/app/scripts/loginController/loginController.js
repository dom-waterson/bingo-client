(function () {
    'use strict';
    angular.module('Tombola.BingoClient.LoginController')
        .controller('loginController',['$state', 'proxy', 'userModel', 'nextGameService', function ($state, proxy, userModel, nextGameService) {
            var me = this;
            me.userName = 'drwho';
            me.userPassword = 'tardis123!';

            me.login = function () {
                proxy.login(me.userName, me.userPassword).then(function (response) {
                    if(response.message === 'LoginSuccess'){
                        userModel.createUser(response.payload.user.username, '2000', response.payload.user.token);
                        $state.go('lobby');
                    }
                });
            };

            me.logout = function () {
                proxy.logout(userModel.token).then(function (response) {
                    if(response.message === 'LogoutSuccess') {
                        userModel.clearUser();
                        nextGameService.stop();
                        $state.go('login');
                    }
                });
            };

        }]);
})();
