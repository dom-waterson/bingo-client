(function () {
    'use strict';
    describe('Testing bingo cell directive', function () {
        var $compile,
            $rootScope,
            bingoCell,
            bingoCellDirective,
            insideBingoCellDirective;

        beforeEach(function () {
            module('Tombola.BingoClient');

            inject(function (_$compile_, _$rootScope_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
            });

            bingoCell = '<bingo-cell strip-row="0" strip-column="0"></bingo-cell>';
            bingoCellDirective = $compile(bingoCell)($rootScope);
            $rootScope.$digest();
            insideBingoCellDirective = bingoCellDirective.find('div');
        });

        it('Ensures bingo-cell directives works', function () {
            bingoCellDirective[0].toString().should.be.equal('[object HTMLElement]');
            bingoCellDirective[0].children.length.should.be.equal(1);
        });

        it.skip('Ensures bingo-cell directives has the correct class', function () {
            insideBingoCellDirective.attr('class').should.be.equal('bingoCell textCenter cellBorder');
        });

        it('Ensures bingo-cell directives has the correct attribute', function () {
            bingoCellDirective.attr('strip-row').should.be.equal('0');
            bingoCellDirective.attr('strip-column').should.be.equal('0');
        });
    });
})();
