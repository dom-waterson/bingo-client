(function () {
    'use strict';
    angular.module('Tombola.BingoClient.Proxy')
        .service('Proxy', ['$http', '$q', 'TokenService', 'ObjectConverter', function ($http, $q, TokenService, ObjectConverter) {

            var me = this;

            var callApi = function (endpoint, action, data) {
                var deferred = $q.defer();
                var req = {
                    method: action,
                    url: 'http://domubuntu-nu8d4jga.cloudapp.net:30069/' + endpoint,
                    data: data,
                    headers: {
                        'x-token': TokenService.getToken(),
                        'content-type': 'application/json'
                    }
                };
                $http(req).
                    then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (response) {
                        deferred.reject(response.data);
                        console.log('Error coming from proxy:' + response);
                    });

                return deferred.promise;
            };

            me.login = function (username, password) {
                var urlEndPoint = 'users/login';
                var data = {
                    'username': username,
                    'password': password
                };
                return callApi(urlEndPoint, 'POST', data, 'generateLoginObject');
            };

            me.logout = function () {
                var urlEndPoint = 'users/logout';
                var data = {};
                return callApi(urlEndPoint, 'POST', data);
            };

            me.nextGame = function () {
                var urlEndpoint = 'game/next';
                var data = {};
                return callApi(urlEndpoint, 'GET', data, 'generateBingoCallObject');
            };

            me.buyTicket = function (balance, userId) {
                var urlEndPoint = 'game/buyticket';
                var data = {'gameId': 1, 'userId': userId, 'balance': balance};
                return callApi(urlEndPoint, 'POST', data, 'generateBuyTicketObject');
            };

            me.getBingoNumber = function (userId, balance, call) {
                var urlEndPoint = 'game/getcall';
                var data = {"gameId": 1, "userId": userId, "balance": balance, "callnumber": call};
                return callApi(urlEndPoint, 'POST', data, 'generateBingoCallObject');
            };

        }]);
})();
