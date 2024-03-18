import request from 'supertest';

const NAGER_DATE_API = 'https://date.nager.at/api/v3';

describe('Nager Date API: E2E Tests', () => {
  describe('PublicHolidays', () => {
    const PATH = '/PublicHolidays';
    it('should return a list of public holidays', async () => {
      const { status, body } = await request(NAGER_DATE_API).get(`${PATH}/2024/US`);
      const holiday = body[0];

      expect(status).toEqual(200);
      expect(body).toEqual(expect.any(Array));
      expect(holiday.date).toEqual(expect.any(String));
      expect(holiday.name).toEqual(expect.any(String));
      expect(holiday.localName).toEqual(expect.any(String));
    });

    it('should return 404 if country code is unknown', async () => {
      const { status } = await request(NAGER_DATE_API).get(`${PATH}/2024/XX`);
      expect(status).toEqual(404);
    });
    it('should return 400 if validation fails', async () => {
      const { status } = await request(NAGER_DATE_API).get(`${PATH}/US/2024`);
      expect(status).toEqual(400);
    });
  });
  describe('IsTodayPublicHoliday', () => {
    const PATH = '/IsTodayPublicHoliday';
    it('should return a list of public holidays', async () => {
      const { status } = await request(NAGER_DATE_API).get(`${PATH}/US`);

      expect(status.toString()).toMatch(/200|204/);
    });

    it('should return 404 if country code is unknown', async () => {
      const { status } = await request(NAGER_DATE_API).get(`${PATH}/XX`);
      expect(status).toEqual(404);
    });
  });
});
