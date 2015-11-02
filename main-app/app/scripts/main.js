(function () {
    'use strict';
    angular.module('Tombola.BingoClient.Proxy', []);
    angular.module('Tombola.BingoClient.UserModel', []);
    angular.module('Tombola.BingoClient.BingoTicket', []);
    angular.module('Tombola.BingoClient.LoginController', ['Tombola.BingoClient.Proxy', 'Tombola.BingoClient.UserModel']);
    angular.module('Tombola.BingoClient.GameController', ['Tombola.BingoClient.Proxy', 'Tombola.BingoClient.UserModel', 'Tombola.BingoClient.BingoTicket']);
    angular.module('Tombola.BingoClient', ['Tombola.BingoClient.LoginController', 'Tombola.BingoClient.GameController']);
})();
