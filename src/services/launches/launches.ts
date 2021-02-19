import { API_ROOT, GET_REQUEST_NAME } from 'constant';
import Request, { setMethod, setParams, setURL } from 'services/requests';

/**
 * getLaunches -service call to get all launches resources
 * @param queryParam -can have query params as object {..} it cna be optional
 */
export const getLaunches = (queryParam?: any) =>
  Request(setURL(`${API_ROOT}/launches`), setMethod(GET_REQUEST_NAME), setParams(queryParam));

/**
 * getUpcomingLaunches -service call to get all upcoming launches resources
 * @param queryParam -can have query params as object {..} it cna be optional
 */
export const getUpcomingLaunches = (queryParam?: any) =>
  Request(setURL(`${API_ROOT}/launches/upcoming`), setMethod(GET_REQUEST_NAME), setParams(queryParam));

/**
 * getPastLaunches -service call to get all past launches resources
 * @param queryParam -can have query params as object {..} it cna be optional
 */
export const getPastLaunches = (queryParam?: any) =>
  Request(setURL(`${API_ROOT}/launches/past`), setMethod(GET_REQUEST_NAME), setParams(queryParam));

/**
 * getSucessLaunches -service call to get all success launches resources
 * @param queryParam -can have query params as object {..} it cna be optional
 */
export const getSucessLaunches = (queryParam?: any) =>
  Request(setURL(`${API_ROOT}/launches?launch_success=true`), setMethod(GET_REQUEST_NAME), setParams(queryParam));

/**
 * getFailLaunches -service call to get all fail launches resources
 * @param queryParam -can have query params as object {..} it cna be optional
 */
export const getFailLaunches = (queryParam?: any) =>
  Request(setURL(`${API_ROOT}/launches?launch_success=false`), setMethod(GET_REQUEST_NAME), setParams(queryParam));
