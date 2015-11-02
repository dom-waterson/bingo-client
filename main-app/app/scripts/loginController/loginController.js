(function () {
    'use strict';
    angular.module('Tombola.BingoClient.LoginController')
        .controller('loginController',['$state', 'proxy', 'userModel', function ($state, proxy, userModel) {
            var me = this;
            me.userName = 'drwho';
            me.userPassword = 'tardis123!';

            me.login = function () {
                proxy.login(me.userName, me.userPassword).then(function (response) {
                    if(response.message === 'LoginSuccess'){
                        userModel.token = response.payload.user.token;
                        userModel.currentBalance = response.payload.user.balance;
                        userModel.name = response.payload.user.username;
                        $state.go('lobby');
                    }
                });
            };

            me.logout = function () {
                proxy.logout(userModel.token).then(function (response) {
                    if(response.message === 'LogoutSuccess') {
                        userModel.clearUser();
                        $state.go('login');
                    }
                });
            };

        }]);
})();
