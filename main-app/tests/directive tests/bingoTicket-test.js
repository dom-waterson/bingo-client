(function () {
    'use strict';
    describe('Testing bingo cell directive', function () {
        var $compile,
            $rootScope,
            bingoTicket,
            bingoTicketDirective,
            insideBingoTicketDirective;

        beforeEach(function () {
            module('Tombola.BingoClient');

            inject(function (_$compile_, _$rootScope_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_.$new();
            });

            bingoTicket = angular.element('<bingo-ticket ng-init="game.numberCalling.startPolling()"></bingo-ticket>');
            bingoTicketDirective = $compile(bingoTicket)($rootScope);
            $rootScope.$digest();
            insideBingoTicketDirective = bingoTicketDirective.find('div');
        });

        it('Ensures bingo-cell directives works', function () {
            bingoTicketDirective[0].toString().should.be.equal('[object HTMLElement]');
            console.log(bingoTicketDirective[0]);
            //bingoTicketDirective[0].children.length.should.be.equal(1);
        });

        it.skip('Ensures bingo-cell directives has the correct class', function () {
            insideBingoCellDirective.attr('class').should.be.equal('bingoCell textCenter cellBorder');
        });

        it.skip('Ensures bingo-cell directives has the correct attribute', function () {
            bingoCellDirective.attr('strip-row').should.be.equal('0');
            bingoCellDirective.attr('strip-column').should.be.equal('0');
        });
    });
})();
