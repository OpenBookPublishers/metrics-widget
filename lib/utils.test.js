import {compareNumbers} from "./utils";

describe('Utils', () => {
    const countryValues = [{
        country: "GB",
        value: 1000
    }, {
        country: "ES",
        value: 2000
    }, {
        country: "US",
        value: 2000
    }, {
        country: "CU",
        value: 100
    }];
    const orderedCountryValues = [{
        country: "ES",
        value: 2000
    }, {
        country: "US",
        value: 2000
    }, {
        country: "GB",
        value: 1000
    }, {
        country: "CU",
        value: 100
    }];
    
    describe('compareNumbers', () => {
        it('should return 0 if the values are equal', () => {
            expect(compareNumbers(countryValues[1], countryValues[2])).toEqual(0);
        });
        it('should return 1 when a is lower than b', () => {
            expect(compareNumbers(countryValues[0], countryValues[1])).toEqual(1);
        });
        it('should return -1 when a is higher than b', () => {
            expect(compareNumbers(countryValues[1], countryValues[3])).toEqual(-1);
        });
        it('should return countryValues orderd by value', () => {
            expect(countryValues.sort(compareNumbers)).toEqual(orderedCountryValues);
        });
    });
});
