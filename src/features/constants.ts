import { addIndex, map } from 'ramda';

export const GET_LAUNCHES = 'get_launches';
export const UPCOMING_LAUNCHES_CALL = 'upcoming_launches';
export const PAST_LAUNCHES_CALL = 'past_launches';
export const FAIL_LAUNCHES_CALL = 'fail_launches';
export const SUCESS_LAUNCHES_CALL = 'success_launches';
export const TOTAL_NUMBER_OF_DATAS = 250;
export const TOTAL_OFFSET_PER_PAGE = 25;
export const ZERO = 0;
export const ONE = 1;
export const STATUS_SUCCESS = 'Success';
export const STATUS_FAILED = 'Failed';
export const ALL_LAUNCHES = 'All Launches';
export const UPCOMING_LAUNCHES = 'Upcoming Launches';
export const SUCCESSFUL_LAUNCHES = 'Successful Launches';
export const FAILED_LAUNCHES = 'Failed Launches';
export const PAST_WEEK = 'Past week';
export const PAST_MONTH = 'Past month';
export const PAST_3_MONTH = 'Past 3 months';
export const PAST_6_MONTH = 'Past 6 months';
export const PAST_YEAR = 'Past year';
export const PAST_2_YEAR = 'Past 2 years';
export const FILTER_DATE_FORMAT = 'YYYY-MM-DD';
export const DEFAULT_NAME = 'default';
export const TYPES_OF_LAUNCHES = [
  {
    label: ALL_LAUNCHES,
    value: GET_LAUNCHES
  },
  {
    label: UPCOMING_LAUNCHES,
    value: UPCOMING_LAUNCHES_CALL
  },
  {
    label: SUCCESSFUL_LAUNCHES,
    value: SUCESS_LAUNCHES_CALL
  },
  {
    label: FAILED_LAUNCHES,
    value: FAIL_LAUNCHES_CALL
  }
];

export const TYPE_OF_DATE_FILTERS = [
  {
    label: 'Select filter',
    value: DEFAULT_NAME
  },
  {
    label: PAST_WEEK,
    value: PAST_WEEK
  },
  {
    label: PAST_MONTH,
    value: PAST_MONTH
  },
  {
    label: PAST_3_MONTH,
    value: PAST_3_MONTH
  },
  {
    label: PAST_6_MONTH,
    value: PAST_6_MONTH
  },
  {
    label: PAST_YEAR,
    value: PAST_YEAR
  },
  {
    label: PAST_2_YEAR,
    value: PAST_2_YEAR
  }
];

export const mapIndexed = addIndex(map);
