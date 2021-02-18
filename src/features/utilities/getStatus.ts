import { STATUS_FAILED, STATUS_SUCCESS } from 'features/constants';

/**
 * getStatus-function will return the status with the color described inside object
 */
export default (status: boolean) => {
  if (status) {
    return { status: STATUS_SUCCESS, color: 'green' };
  }
  return { status: STATUS_FAILED, color: 'red' };
};
