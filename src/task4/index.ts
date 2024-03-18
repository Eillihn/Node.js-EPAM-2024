import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays
} from './services/public-holidays.service';
import { SUPPORTED_COUNTRIES } from './config';

console.log(await getListOfPublicHolidays(new Date().getFullYear(), SUPPORTED_COUNTRIES[0]));
console.log(await checkIfTodayIsPublicHoliday(SUPPORTED_COUNTRIES[0]));
console.log(await getNextPublicHolidays(SUPPORTED_COUNTRIES[0]));
