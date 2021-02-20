import { FILTER_DATE_FORMAT } from 'features/constants';
import * as moment from 'moment';
import { isEmpty, not } from 'ramda';

/**
 * formatTimeStamp - will convert the timestamp to the below given format
 * @param date date as timestamp string to convert to the MMM Do YYYY h:mm a
 */
export const formatTimeStamp = (date: any) => {
  if (not(isEmpty(date))) {
    return moment.utc(date).format('Do MMM YYYY h:mm a');
  }
};
/**
 * timeStampInISOFormat - will be returning local timestamp in ISO Format "2020-05-16T08:28:29.389+0000"
 */
export const timeStampInISOFormat = () => {
  return moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
};

/**
 * getStartDateOfLastGivenYears -  returns start date of last given number of year from current date or for a given date
 * @param date can have date ,if date is not given then current date will be used
 */
export const getStartDateOfLastGivenYears = (numberOfYears: any, date?: string) => {
  if (date) {
    return moment.utc(date).subtract(numberOfYears, 'years').startOf('year').format(FILTER_DATE_FORMAT);
  }
  return moment.utc(timeStampInISOFormat()).subtract(numberOfYears, 'years').startOf('year').format(FILTER_DATE_FORMAT);
};

/**
 * getLastDateOfLastGivenYears -  returns last date of last given number of years from current date or for a given date
 * @param date can have date ,if date is not given then current date will be used
 */
export const getLastDateOfLastGivenYears = (numberOfYears: any, date?: string) => {
  if (date) {
    return moment.utc(date).subtract(numberOfYears, 'years').endOf('year').format(FILTER_DATE_FORMAT);
  }
  return moment.utc(timeStampInISOFormat()).subtract(numberOfYears, 'years').endOf('year').format(FILTER_DATE_FORMAT);
};

/**
 * getStartDatesOfMonths -  returns start date of last given number of months from current date or for a given date
 * @param date can have date ,if date is not given then current date will be used
 */
export const getStartDatesOfMonths = (substractMonth: number, date?: string) => {
  if (date) {
    return moment.utc(date).subtract(substractMonth, 'months').startOf('month').format(FILTER_DATE_FORMAT);
  }
  return moment
    .utc(timeStampInISOFormat())
    .subtract(substractMonth, 'months')
    .startOf('month')
    .format(FILTER_DATE_FORMAT);
};

/**
 * getStartDatesOfMonths -  returns start date of last given number of months from current date or for a given date
 * @param date can have date ,if date is not given then current date will be used
 */
export const getLastDateDatesOfMonths = (substractMonth: number, date?: string) => {
  if (date) {
    return moment.utc(date).subtract(substractMonth, 'months').endOf('month').format(FILTER_DATE_FORMAT);
  }
  return moment
    .utc(timeStampInISOFormat())
    .subtract(substractMonth, 'months')
    .endOf('month')
    .format(FILTER_DATE_FORMAT);
};

/**
 * getStartDatesOfWeeks -  returns start date of last given number of weeks from current date or for a given date
 * @param date can have date ,if date is not given then current date will be used
 */
export const getStartDatesOfWeeks = (substractWeek: number, date?: string) => {
  if (date) {
    return moment.utc(date).subtract(substractWeek, 'weeks').startOf('week').format(FILTER_DATE_FORMAT);
  }
  return moment.utc(timeStampInISOFormat()).subtract(substractWeek, 'weeks').startOf('week').format(FILTER_DATE_FORMAT);
};

/**
 * getLastDatesOfWeeks -  returns last date of last given number of weeks from current date or for a given date
 * @param date can have date ,if date is not given then current date will be used
 */
export const getLastDatesOfWeeks = (substractWeek: number, date?: string) => {
  if (date) {
    return moment.utc(date).subtract(substractWeek, 'weeks').endOf('week').format(FILTER_DATE_FORMAT);
  }
  return moment.utc(timeStampInISOFormat()).subtract(substractWeek, 'weeks').endOf('week').format(FILTER_DATE_FORMAT);
};
