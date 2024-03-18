import axios from 'axios';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from './public-holidays.service';
import { SUPPORTED_COUNTRIES } from '../config';

jest.mock('axios');

describe('Public Holidays Service: Unit Tests', () => {
  const getFirstJanuaryCurrentYear = () => {
    return `${new Date().getFullYear()}-01-01`;
  };
  const year = new Date().getFullYear();
  const country = SUPPORTED_COUNTRIES[0];
  const publicHolidays = [
    {
      'date': getFirstJanuaryCurrentYear(),
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
      'date': getFirstJanuaryCurrentYear(),
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
      const result = await getListOfPublicHolidays(year, country);
      expect(result).toEqual(shortenPublicHolidays);
    });

    it('should return an empty array on API error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('API Error'));
      const result = await getListOfPublicHolidays(year, country);
      expect(result).toEqual([]);
    });
  });

  describe('checkIfTodayIsPublicHoliday', () => {

    it('should return true when today is a public holiday', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ status: 200 });
      const result = await checkIfTodayIsPublicHoliday(country);
      expect(result).toBe(true);
    });

    it('should return false when today is not a public holiday', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ status: 404 });
      const result = await checkIfTodayIsPublicHoliday(country);
      expect(result).toBe(false);
    });

    it('should return false on API error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('API Error'));
      const result = await checkIfTodayIsPublicHoliday(country);
      expect(result).toBe(false);
    });
  });

  describe('getNextPublicHolidays', () => {

    it('should return a list of shortened next public holidays', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue(Promise.resolve({ data: publicHolidays }));
      const result = await getNextPublicHolidays(country);
      expect(result).toEqual(shortenPublicHolidays);
    });

    it('should return an empty array on API error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('API Error'));
      const result = await getNextPublicHolidays(country);
      expect(result).toEqual([]);
    });
  });
});
