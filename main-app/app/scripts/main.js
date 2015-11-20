(function () {
    'use strict';
    angular.module('Tombola.BingoClient.ObjectConverter', []);
    angular.module('Tombola.BingoClient.Proxy', ['Tombola.BingoClient.ObjectConverter']);
    angular.module('Tombola.BingoClient.UserModel', []);
    angular.module('Tombola.BingoClient.BingoTicket', []);
    angular.module('Tombola.NumberService', ['Tombola.BingoClient.BingoTicket']);
    angular.module('Tombola.BingoClient.Authentication',['ui.router']);
    angular.module('Tombola.LongPollingService', ['Tombola.BingoClient.Proxy', 'Tombola.BingoClient.UserModel']);
    angular.module('Tombola.BingoClient.NextGameService', ['Tombola.BingoClient.UserModel', 'Tombola.BingoClient.Proxy']);
    angular.module('Tombola.BingoClient.LoginController', ['Tombola.BingoClient.Proxy', 'Tombola.BingoClient.UserModel', 'Tombola.NumberService']);
    angular.module('Tombola.BingoClient.GameController', ['Tombola.BingoClient.Proxy', 'Tombola.BingoClient.UserModel', 'Tombola.BingoClient.BingoTicket', 'Tombola.BingoClient.NextGameService', 'Tombola.LongPollingService']);
    angular.module('Tombola.BingoClient', ['Tombola.BingoClient.LoginController', 'Tombola.BingoClient.GameController', 'ui.router', 'Tombola.BingoClient.Authentication']);
})();
