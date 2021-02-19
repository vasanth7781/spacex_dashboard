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
