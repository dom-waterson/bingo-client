(function () {
    'use strict';
    describe('Testing game controller', function () {
        var $controller,
            $q,
            GameController,
            sandbox;

        beforeEach(function () {
            module('Tombola.BingoClient.GameController');
            inject(function (_$controller_, _$q_) {
                $controller = _$controller_;
                $q = _$q_;
            });
            GameController = $controller('GameController',
                {
                    Proxy: mocks.Proxy,
                    UserModel: mocks.UserModel,
                    BingoModel: mocks.BingoModel,
                    NextGameService: mocks.NextGameService,
                    BingoNumberCalling: mocks.BingoNumberCalling,
                    WinnerChecking: mocks.WinnerChecking
                });
            sandbox = sinon.sandbox.create();
        });

        it('When next game is triggered counter is started', function () {
            var counterSpy = sinon.sandbox.spy(mocks.NextGameService, 'startCounter');
            GameController.nextGame();
            counterSpy.should.have.been.calledOnce;
        });

        it('When buyTicket is triggered proxy is called', function () {
            var deferred = $q.defer();
            var ticketSpy = sinon.sandbox.stub(mocks.Proxy, 'buyTicket', function () {
                return deferred.promise;
            });
            GameController.buyTicket();
            ticketSpy.should.have.been.calledOnce;
        });

        afterEach(function () {
           sandbox.restore();
        });
    });
})();
