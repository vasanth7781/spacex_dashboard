import {
  GET_LAUNCHES,
  UPCOMING_LAUNCHES_CALL,
  PAST_LAUNCHES_CALL,
  FAIL_LAUNCHES_CALL,
  SUCESS_LAUNCHES_CALL
} from 'features/constants';
import { useState } from 'react';
import {
  getLaunches,
  getFailLaunches,
  getUpcomingLaunches,
  getPastLaunches,
  getSucessLaunches
} from 'services/launches/launches';

/**
 * launchServiceCalls - mapped service calls for launches
 */
const launchServiceCalls = {
  [GET_LAUNCHES]: getLaunches,
  [UPCOMING_LAUNCHES_CALL]: getUpcomingLaunches,
  [PAST_LAUNCHES_CALL]: getPastLaunches,
  [FAIL_LAUNCHES_CALL]: getFailLaunches,
  [SUCESS_LAUNCHES_CALL]: getSucessLaunches
};
/**
 * lauchCall - will be returnes as function ,that can called with typeof activity,
 * data,loading,callFn can be send as we send it in higher order function
 */
// eslint-disable-next-line
export default () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const lauchCall = (launchServiceCall: 'get_launches', queryParam?: any) => {
    setLoading(true);
    return launchServiceCalls[launchServiceCall](queryParam)
      .then((res: any) => {
        setData(res);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
      });
  };

  return { lauchCall, loading, data };
};
