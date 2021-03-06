import { HOTP } from '../../src';

describe('- Integration hotp.generate.test.ts file (http://tools.ietf.org/html/rfc4226#page-32)', () => {
    /**
     * Test if HOTP.generate() returns good value with good parameters
     */
    test('- `HOTP.generate()` - key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', counter:0, counter_format:\'int\', code_digits:6, add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'SHA512\'}', (done) => {
        HOTP.generate('12345678901234567890').subscribe(_ => {
            expect(_).toBe('125165');
            done();
        });
    });

    test('- `HOTP.generate()` - key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', counter:0, counter_format:\'int\', code_digits:6, add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'SHA1\'}', (done) => {
        HOTP.generate('12345678901234567890', { algorithm: 'SHA1' }).subscribe(_ => {
            expect(_).toBe('755224');
            done();
        });
    });

    test('- `HOTP.generate()` - key => \'3132333435363738393031323334353637383930\' and options => ' +
        '{key_format:\'hex\', counter:0, counter_format:\'int\', code_digits:6, add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'SHA1\'}', (done) => {
        HOTP.generate('3132333435363738393031323334353637383930', { key_format: 'hex', algorithm: 'SHA1' })
            .subscribe(_ => {
                expect(_).toBe('755224');
                done();
            });
    });

    test('- `HOTP.generate()` - key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', counter:5, counter_format:\'int\', code_digits:6, add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'SHA1\'}', (done) => {
        HOTP.generate('12345678901234567890', { counter: 5, algorithm: 'SHA1' }).subscribe(_ => {
            expect(_).toBe('254676');
            done();
        });
    });

    test('- `HOTP.generate()` - key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', counter:\'9\', counter_format:\'hex\', code_digits:6, add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'SHA1\'}', (done) => {
        HOTP.generate('12345678901234567890', { counter: '9', counter_format: 'hex', algorithm: 'SHA1' })
            .subscribe(_ => {
                expect(_).toBe('520489');
                done();
            });
    });

    test('- `HOTP.generate()` - key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', counter:\'2\', counter_format:\'hex\', code_digits:6, add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'SHA1\'}', (done) => {
        HOTP.generate('12345678901234567890', { counter: '2', counter_format: 'hex', algorithm: 'SHA1' })
            .subscribe(_ => {
                expect(_).toBe('359152');
                done();
            });
    });

    test('- `HOTP.generate()` - key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', counter:7, counter_format:\'int\', code_digits:10, add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'SHA1\'}', (done) => {
        HOTP.generate('12345678901234567890', { counter: 7, code_digits: 10, algorithm: 'SHA1' })
            .subscribe(_ => {
                expect(_).toBe('0082162583');
                done();
            });
    });

    test('- `HOTP.generate()` - key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', counter:7, counter_format:\'int\', code_digits:6, add_checksum:true, truncation_offset: -1, ' +
        'algorithm:\'SHA1\'}', (done) => {
        HOTP.generate('12345678901234567890', { counter: 7, add_checksum: true, algorithm: 'SHA1' })
            .subscribe(_ => {
                expect(_).toBe('1625839');
                done();
            });
    });
});
