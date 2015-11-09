(function () {
    'use strict';
    angular.module('Tombola.BingoClient.Proxy', []);
    angular.module('Tombola.BingoClient.UserModel', []);
    angular.module('Tombola.BingoClient.BingoTicket', []);
    angular.module('Tombola.LongPollingService', ['Tombola.BingoClient.Proxy', 'Tombola.BingoClient.UserModel']);
    angular.module('Tombola.BingoClient.NextGameService', ['Tombola.BingoClient.UserModel', 'Tombola.BingoClient.Proxy']);
    angular.module('Tombola.BingoClient.LoginController', ['Tombola.BingoClient.Proxy', 'Tombola.BingoClient.UserModel']);
    angular.module('Tombola.BingoClient.GameController', ['Tombola.BingoClient.Proxy', 'Tombola.BingoClient.UserModel', 'Tombola.BingoClient.BingoTicket', 'Tombola.BingoClient.NextGameService', 'Tombola.LongPollingService']);
    angular.module('Tombola.BingoClient', ['Tombola.BingoClient.LoginController', 'Tombola.BingoClient.GameController', 'ui.router']);
})();
