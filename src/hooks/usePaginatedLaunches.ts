import { GET_LAUNCHES } from 'features/constants';
import { useState } from 'react';
import { getLaunches } from 'services/launches/launches';

/**
 * launchServiceCalls - mapped service calls for launches
 */
const launchServiceCalls = {
  [GET_LAUNCHES]: getLaunches
};
/**
 * lauchCall - will be returnes as function ,that can called with typeof activity,
 * data,loading,callFn can be send as we send it in higher order function
 */
export default () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const lauchCall = (launchServiceCall: 'get_launches', queryParam?: any) => {
    setLoading(true);
    launchServiceCalls[launchServiceCall](queryParam)
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
