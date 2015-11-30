(function () {
    'use strict';
    angular.module('Tombola.BingoClient.LoginController')
        .controller('LoginController',
        ['$state', 'Proxy', 'UserModel', 'NextGameService', 'TokenService', 'ObjectConverter', function ($state, Proxy,
                                                                                                         UserModel,
                                                                                                         NextGameService,
                                                                                                         TokenService,
                                                                                                         ObjectConverter) {
            var me = this;
            me.userName = 'drwho';
            me.userPassword = 'tardis123!';

            me.login = function () {
                Proxy.login(me.userName, me.userPassword).then(function (response) {
                    var loginObject = ObjectConverter.generateLoginObject(response);
                    TokenService.setToken(loginObject.token);
                    UserModel.createUser(loginObject.name, '2000');
                    $state.go('lobby');
                });
            };

            me.logout = function () {
                Proxy.logout(UserModel.token).then(function () {
                    TokenService.resetToken();
                    UserModel.clearUser();
                    NextGameService.stop();
                    $state.go('login');
                });
            };

        }]);
})();
