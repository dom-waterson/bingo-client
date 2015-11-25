(function () {
    'use strict';
    describe('Testing login controller', function () {
        var $controller,
            $q,
            $state,
            LoginController,
            sandbox;
        beforeEach(module('ui.router'));

        beforeEach(function () {
            module('Tombola.BingoClient.LoginController');
            inject(function (_$controller_, _$q_, _$stateParams_) {
                $controller = _$controller_;
                $q = _$q_;
                $state = _$stateParams_;
            });
            LoginController = $controller('LoginController',
                {
                    Proxy: mocks.Proxy,
                    UserModel: mocks.UserModel,
                    NextGameService: mocks.NextGameService
                });
            sandbox = sinon.sandbox.create();
        });

        it('When login is triggered proxy is called', function () {
            var deferred = $q.defer();
            var loginSpy = sinon.sandbox.stub(mocks.Proxy, 'login', function () {
                return deferred.promise;
            });
            LoginController.login();
            loginSpy.should.have.been.calledOnce;
        });

        it('When logout is triggered proxy is called', function () {
            var deferred = $q.defer();
            var logoutSpy = sinon.sandbox.stub(mocks.Proxy, 'logout', function () {
                return deferred.promise;
            });
            LoginController.logout();
            logoutSpy.should.have.been.calledOnce;
        });

        afterEach(function () {
            sandbox.restore();
        });
    });
})();
