(function () {
    'use strict';
    describe('Testing the user model', function () {
        var userModelService;

        beforeEach(function () {
            module('Tombola.BingoClient.UserModel');

            inject(function ($injector) {
                userModelService = $injector.get('UserModel');
            });
        });

        it.skip('Ensures user model has the correct default values', function () {

        });
    });
})();
