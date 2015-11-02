(function () {
    'use strict';
    angular.module('Tombola.BingoClient.Proxy', []);
    angular.module('Tombola.BingoClient.LoginController', ['Tombola.BingoClient.Proxy']);
    angular.module('Tombola.BingoClient', ['Tombola.BingoClient.LoginController']);
})();
