(function () {
    'use strict';
   angular.module('Tombola.BingoClient.Proxy')
       .service ('gameProxy', ['$http', '$q', function ($http, $q) {

            var me = this;

       var callApi = function (endpoint, action, data, token){
           var deferred = $q.defer();
           var req = {
               method: action,
               url: 'http://localhost:30069/' + endpoint,
               data: data,
               headers : {
                   'x-token' : token,
                   'content-type' : 'application/json'
               }
           };
           $http(req).
               then(function(response) {
                   var objectToBeReturned = {
                       message : response.data.message,
                       balance : response.data.payload.user.balance,
                       numberCalled : response.data.payload.callnumber,
                       winnerInfo: response.data.payload.winnerInfo,
                       ticket : response.data.payload.card
                   };
                   deferred.resolve(objectToBeReturned);
               }).catch( function(response) {
                   deferred.reject(response.data);
                   console.log('Error coming from proxy:' + response);
               });

           return deferred.promise;
       };

       me.nextGame = function (token) {
           var urlEndpoint = 'game/next';
           var data = {};
           return callApi(urlEndpoint, 'GET', data, token);
       };

       me.buyTicket = function (token, balance, userId) {
           var urlEndPoint = 'game/buyticket';
           var data = {'gameId': 1, 'userId': userId, 'balance': balance};
           return callApi(urlEndPoint, 'POST', data, token);
       };

       me.getBingoNumber = function (token, userId, balance, call) {
           var urlEndPoint = 'game/getcall';
           var data = {"gameId":1, "userId":userId, "balance":balance, "callnumber":call};
           return callApi(urlEndPoint, 'POST', data, token);
       };
   }]);
})();