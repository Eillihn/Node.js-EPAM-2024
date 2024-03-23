import axios from 'axios';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from './public-holidays.service';
import * as helpers from '../helpers';
import { SUPPORTED_COUNTRIES } from '../config';

jest.mock('axios');
jest.mock('../helpers', () => ({
  ...jest.requireActual('../helpers'),
  validateInput: jest.fn(),
  shortenPublicHoliday: jest.fn(),
}));

describe('Public Holidays Service: Unit Tests', () => {
  const year = 2024;
  const country = SUPPORTED_COUNTRIES[0];
  const publicHolidays = [
    {
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
    },
  ];
  const shortenPublicHolidays = [
    {
      'date': '2024-01-01',
      'localName': 'New Year\'s Day',
      'name': 'New Year\'s Day',
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getListOfPublicHolidays', () => {
    it('should return a list of shortened public holidays', async () => {

      jest.spyOn(axios, 'get').mockResolvedValue(Promise.resolve({ data: publicHolidays }));
      jest.spyOn(helpers, 'validateInput').mockReturnValue(true);
      jest.spyOn(helpers, 'shortenPublicHoliday').mockReturnValue(shortenPublicHolidays[0]);

      const result = await getListOfPublicHolidays(year, country);

      expect(helpers.validateInput).toHaveBeenCalledWith({ year, country });
      expect(result).toEqual(shortenPublicHolidays);
    });

    it('should return an empty array on API error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('API Error'));
      jest.spyOn(helpers, 'validateInput').mockReturnValue(true);

      const result = await getListOfPublicHolidays(year, country);

      expect(helpers.validateInput).toHaveBeenCalledWith({ year, country });
      expect(result).toEqual([]);
    });
  });

  describe('checkIfTodayIsPublicHoliday', () => {

    it('should return true when today is a public holiday', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ status: 200 });
      jest.spyOn(helpers, 'validateInput').mockReturnValue(true);

      const result = await checkIfTodayIsPublicHoliday(country);

      expect(helpers.validateInput).toHaveBeenCalledWith({ country });
      expect(result).toBe(true);
    });

    it('should return false when today is not a public holiday', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ status: 404 });
      jest.spyOn(helpers, 'validateInput').mockReturnValue(true);

      const result = await checkIfTodayIsPublicHoliday(country);

      expect(helpers.validateInput).toHaveBeenCalledWith({ country });
      expect(result).toBe(false);
    });

    it('should return false on API error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('API Error'));
      jest.spyOn(helpers, 'validateInput').mockReturnValue(true);

      const result = await checkIfTodayIsPublicHoliday(country);

      expect(helpers.validateInput).toHaveBeenCalledWith({ country });
      expect(result).toBe(false);
    });
  });

  describe('getNextPublicHolidays', () => {

    it('should return a list of shortened next public holidays', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue(Promise.resolve({ data: publicHolidays }));
      jest.spyOn(helpers, 'validateInput').mockReturnValue(true);
      jest.spyOn(helpers, 'shortenPublicHoliday').mockReturnValue(shortenPublicHolidays[0]);

      const result = await getNextPublicHolidays(country);

      expect(helpers.validateInput).toHaveBeenCalledWith({ country });
      expect(result).toEqual(shortenPublicHolidays);
    });

    it('should return an empty array on API error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('API Error'));
      jest.spyOn(helpers, 'validateInput').mockReturnValue(true);

      const result = await getNextPublicHolidays(country);

      expect(helpers.validateInput).toHaveBeenCalledWith({ country });
      expect(result).toEqual([]);
    });
  });
});
