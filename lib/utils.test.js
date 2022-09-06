import { compareNumbers, formatLabel } from './utils';

describe('Utils', () => {
    describe('compareNumbers', () => {
        const countryValues = [{
            country: 'GB',
            value: 1000,
        }, {
            country: 'ES',
            value: 2000,
        }, {
            country: 'US',
            value: 2000,
        }, {
            country: 'CU',
            value: 100,
        }];
        const orderedCountryValues = [{
            country: 'ES',
            value: 2000,
        }, {
            country: 'US',
            value: 2000,
        }, {
            country: 'GB',
            value: 1000,
        }, {
            country: 'CU',
            value: 100,
        }];

        it('should return 0 if the values are equal', () => {
            expect(compareNumbers(countryValues[1], countryValues[2])).toEqual(0);
        });
        it('should return 1 when a is lower than b', () => {
            expect(compareNumbers(countryValues[0], countryValues[1])).toEqual(1);
        });
        it('should return -1 when a is higher than b', () => {
            expect(compareNumbers(countryValues[1], countryValues[3])).toEqual(-1);
        });
        it('should return countryValues ordered by value', () => {
            expect(countryValues.sort(compareNumbers)).toEqual(orderedCountryValues);
        });
    });

    describe('formatLabel', () => {
        it('should capitalise the first letter of every word', () => {
            const toTest = { source: 'some lowercase source', type: 'downloads' };
            const expected = 'Some Lowercase Source Downloads';
            expect(formatLabel(toTest)).toEqual(expected);
        });
        it('should replace Open Book Publishers with OBP', () => {
            const toTest = { source: 'Open Book Publishers', type: 'downloads' };
            const expected = 'OBP Downloads';
            expect(formatLabel(toTest)).toEqual(expected);
        });
        it('should replace open book publishers with OBP', () => {
            const toTest = { source: 'open book publishers', type: 'downloads' };
            const expected = 'OBP Downloads';
            expect(formatLabel(toTest)).toEqual(expected);
        });
    });
});
