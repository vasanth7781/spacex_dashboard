import { ONE, PAST_2_YEAR, PAST_3_MONTH, PAST_6_MONTH, PAST_MONTH, PAST_WEEK, PAST_YEAR } from 'features/constants';
import {
  getStartDateOfLastGivenYears,
  getLastDateOfLastGivenYears,
  getStartDatesOfMonths,
  getLastDateDatesOfMonths,
  getStartDatesOfWeeks,
  getLastDatesOfWeeks
} from 'momentUtilities';
import { cond, equals } from 'ramda';

/**
 * getDiffDates- method will return start date and end date for the give date filter key string
 */
// eslint-disable-next-line
export default (dateFilterKey: string, sendDateFn: any) => {
  return cond<any, any>([
    [
      equals(PAST_YEAR),
      () => sendDateFn(getStartDateOfLastGivenYears(ONE), getLastDateOfLastGivenYears(ONE), dateFilterKey)
    ],
    [
      equals(PAST_2_YEAR),
      () => sendDateFn(getStartDateOfLastGivenYears(2), getLastDateOfLastGivenYears(2), dateFilterKey)
    ],
    [equals(PAST_3_MONTH), () => sendDateFn(getStartDatesOfMonths(3), getLastDateDatesOfMonths(3), dateFilterKey)],
    [equals(PAST_6_MONTH), () => sendDateFn(getStartDatesOfMonths(6), getLastDateDatesOfMonths(6), dateFilterKey)],
    [equals(PAST_MONTH), () => sendDateFn(getStartDatesOfMonths(ONE), getLastDateDatesOfMonths(ONE), dateFilterKey)],
    [equals(PAST_WEEK), () => sendDateFn(getStartDatesOfWeeks(ONE), getLastDatesOfWeeks(ONE), dateFilterKey)]
  ])(dateFilterKey);
};
