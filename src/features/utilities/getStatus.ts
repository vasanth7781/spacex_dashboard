import { STATUS_FAILED, STATUS_SUCCESS } from 'features/constants';
import { cond, equals, T } from 'ramda';

/**
 * getStatus-function will return the status with the color described inside object
 */
// eslint-disable-next-line
export default (status: any) => {
  return cond<any, any>([
    [
      equals(true),
      () => {
        return { status: STATUS_SUCCESS, color: 'green' };
      }
    ],
    [
      equals(false),
      () => {
        return { status: STATUS_FAILED, color: 'red' };
      }
    ],
    [
      T,
      () => {
        return { status: '', color: '' };
      }
    ]
  ])(status);
};
