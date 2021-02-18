import { API_ROOT, GET_REQUEST_NAME } from 'constant';
import Request, { setMethod, setParams, setURL } from 'services/requests';

/**
 * getLaunches -service call to get all launches resources
 * @param queryParam -can have query params as object {..} it cna be optional
 */
export const getLaunches = (queryParam?: any) =>
  Request(setURL(`${API_ROOT}/launches`), setMethod(GET_REQUEST_NAME), setParams(queryParam));
