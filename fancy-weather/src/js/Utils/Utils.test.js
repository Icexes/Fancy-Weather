import {getNumberFromRow, convertTemperatureToF, convertTemperatureToC, getDegAndMinutes, changeLocalState, getFlickrTags, checkTimeZone, getObjFromLocalState, setObjToLocalState, removeLoader} from './Utils'

describe('getNumberFromRow', () => {
    it('Should return  value', () => {
        expect(getNumberFromRow('')).toBeDefined();
    })
    it('Should return 123', () => {
        expect(getNumberFromRow('abc123')).toBe('123');
    })
    it('Should return empty string if we don\'t  have numbers in row', () => {
        expect(getNumberFromRow('zxcxzczxs')).toBe('');
    })
});

describe('convertTemperatureToF', () => {
    it('Should return  value', () => {
        expect(convertTemperatureToF('')).toBeDefined();
    })
    it ('Should return Number value',() => {
        expect(typeof convertTemperatureToF('5')).toBe('number');;
    })
    it('Should return 32F', () => {
        expect(convertTemperatureToF('0')).toBe(32);
    })
    it('Should return 95F', () => {
        expect(convertTemperatureToF('35')).toBe(95);
    })

    
});

describe('convertTemperatureToC', () => {
    it('Should return  value', () => {
        expect(convertTemperatureToC('')).toBeDefined();
    })
    it ('Should return Number value',() => {
        expect(typeof convertTemperatureToC('5')).toBe('number');;
    })
    it('Should return 0C', () => {
        expect(convertTemperatureToC('32')).toEqual(0);
    })
    it('Should return 35C', () => {
        expect(convertTemperatureToC('95')).toEqual(35);
    })
});

describe('getDegAndMinutes', () => {
    it('Should return  value', () => {
        expect(getDegAndMinutes('')).toBeDefined();
    })
    it ('Should return String value',() => {
        expect(typeof getDegAndMinutes('5')).toBe('string');;
    })
    it('Should return correct answer', () => {
         
        expect(getDegAndMinutes('10.5')).toEqual(`10°30'`);
    })
    it('Should return correct answer', () => {
         
        expect(getDegAndMinutes('12.8')).toEqual(`12°48'`);
    })
});


describe('changeLocalState', () => {
    it('Should return  nothing', () => {
        expect(changeLocalState('')).toBeUndefined()
    })
    it('Should change localState', () => {
        localStorage.setItem('a', 'b');
        const prevValue= localStorage.getItem('a');
        changeLocalState('a', 'c');
        const currValue = localStorage.getItem('a');
        expect(prevValue === currValue).toBeFalsy()
    })
});

describe('setObjToLocalState', () => {
    it('Should set object to weatherData variable', () => {
        const obj = {a: 1};
        setObjToLocalState(obj);
        expect( localStorage.getItem('weatherData')).toEqual("{\"a\":1}");
    })

});

describe('getFlickrTags', () => {
    it('Should return summer for countries from North hemisphere', () => {
        expect(getFlickrTags('53.893009','Europe/Minsk')).toContain('summer');
    })
    it('Should return winter for countries from South hemisphere', () => {
        expect(getFlickrTags('-33.865143','Europe/Minsk')).toContain('winter');
    })
});


describe('checkTimeZone', () => {
    it('Should return string if timezone is correct', () => {
        expect( typeof checkTimeZone('Europe/Minsk')).toEqual('string');
    })
    it('Should thow Error if timezone is incorrect', () => {

        expect( () => {checkTimeZone('America/Nuuk')}).toThrowError();
    })
});


describe('getObjFromLocalState', () => {
    it('Should return object from localStorage', () => {
        const obj = {a: 1};
        const str = JSON.stringify(obj);
        localStorage.setItem('obj',str);
        expect( typeof getObjFromLocalState(localStorage.getItem('obj'))).toEqual('object');
    })

});

describe('removeLoader', () => {
    it('Should remove Loader, which has been created before', () => {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        document.body.append(spinner);
        removeLoader()
        const result = document.querySelector('.spinner');
        expect(result).toBeNull()
    })

});