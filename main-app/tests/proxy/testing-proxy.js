(function () {
    'use strict';
    describe('Testing proxy', function () {
        var Proxy,
            $httpBackend;
        var responseFromProxy = {'message': 'Success'};
        beforeEach(function () {
            module('Tombola.BingoClient.Proxy');
            inject(function ($injector) {
                Proxy = $injector.get('Proxy');
                $httpBackend = $injector.get('$httpBackend');
            });
        });

        it('Ensures login function communicates successfully with api', function () {
            $httpBackend.expectPOST('http://localhost:30069/users/login', {
                'username': 'drwho',
                'password': 'tardis123!'
            }).respond(responseFromProxy);
            Proxy.login('drwho', 'tardis123!').then(function (response) {
                response.should.deep.equal(responseFromProxy);
            });
            $httpBackend.flush();
        });

        it('Ensures logout function successfully communicates with the api', function () {
            $httpBackend.expectPOST('http://localhost:30069/users/logout').respond(responseFromProxy);
            Proxy.logout().then(function (response) {
                response.should.deep.equal(responseFromProxy);
            });
            $httpBackend.flush();
        });

        it('Ensures nextGame function successfully communicates with the api', function () {
            $httpBackend.expectGET('http://localhost:30069/game/next').respond(responseFromProxy);
            Proxy.nextGame().then(function (response) {
                response.should.deep.equal(responseFromProxy);
            });
            $httpBackend.flush();
        });

        it('Ensures buyTicket function successfully communicates with the api', function () {
            $httpBackend.expectPOST('http://localhost:30069/game/buyticket').respond(responseFromProxy);
            Proxy.buyTicket().then(function (response) {
                response.should.deep.equal(responseFromProxy);
            });
            $httpBackend.flush();
        });

        it('Ensures getBingoNumber function successfully communicates with the api', function () {
            $httpBackend.expectPOST('http://localhost:30069/game/getcall').respond(responseFromProxy);
            Proxy.getBingoNumber().then(function (response) {
                response.should.deep.equal(responseFromProxy);
            });
            $httpBackend.flush();
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
})();
