(function () {
    'use strict';
    angular.module('Tombola.BingoClient.Proxy', []);
    angular.module('Tombola.BingoClient.UserModel', []);
    angular.module('Tombola.BingoClient.BingoTicket', []);
    angular.module('Tombola.BingoClient.WinnerChecking',
        ['Tombola.BingoNumberCalling', 'Tombola.BingoClient.UserModel']);
    angular.module('Tombola.NumberService', ['Tombola.BingoClient.BingoTicket']);
    angular.module('Tombola.BingoNumberCalling',
        ['Tombola.BingoClient.Proxy', 'Tombola.BingoClient.UserModel', 'Tombola.BingoClient.WinnerChecking']);
    angular.module('Tombola.BingoClient.NextGameService',
        ['Tombola.BingoClient.UserModel', 'Tombola.BingoClient.Proxy']);
    angular.module('Tombola.BingoClient.LoginController',
        ['Tombola.BingoClient.Proxy', 'Tombola.BingoClient.UserModel', 'Tombola.NumberService']);
    angular.module('Tombola.BingoClient.GameController',
        ['Tombola.BingoClient.Proxy', 'Tombola.BingoClient.UserModel', 'Tombola.BingoClient.BingoTicket', 'Tombola.BingoClient.NextGameService', 'Tombola.BingoNumberCalling', 'Tombola.BingoClient.WinnerChecking']);
    angular.module('Tombola.BingoClient',
        ['Tombola.BingoClient.LoginController', 'Tombola.BingoClient.GameController', 'ui.router']);
})();
