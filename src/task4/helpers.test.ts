import { validateInput, shortenPublicHoliday } from './helpers';

describe('helpers', () => {
  describe('validateInput', () => {
    it('should return true if input is valid', () => {
      const input = { year: new Date().getFullYear(), country: 'GB' };
      expect(validateInput(input)).toBe(true);
    });

    it('should throw an error if country is invalid', () => {
      const input = { year: new Date().getFullYear(), country: 'LT' };
      expect(() => validateInput(input)).toThrow('Country provided is not supported, received: LT');
    });

    it('should throw an error if year is invalid', () => {
      const input = { year: new Date().getFullYear() - 1, country: 'GB' };
      expect(() => validateInput(input)).toThrow('Year provided not the current, received: 2023');
    });

    it('should not throw an error if input is empty', () => {
      expect(() => validateInput({})).not.toThrow();
    });
  });

  describe('shortenPublicHoliday', () => {
    it('should shorten public holiday', () => {
      const data = {
        'date': '2024-01-01',
        'localName': 'New Year\'s Day',
        'name': 'New Year\'s Day',
        'countryCode': 'US',
        'fixed': false,
        'global': true,
        'counties': null,
        'launchYear': null,
        'types': [
          'Public'
        ]
      };

      const expected = {
        'date': '2024-01-01',
        'localName': 'New Year\'s Day',
        'name': 'New Year\'s Day',
      };

      expect(shortenPublicHoliday(data)).toEqual(expected);
    });
  });
});

