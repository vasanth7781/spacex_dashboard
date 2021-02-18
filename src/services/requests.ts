import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_ROOT } from '../constant';
import { omit } from 'ramda';
import { APIError } from './types';

interface RequestConfig extends AxiosRequestConfig {
  validationErrors?: APIError[];
}

type ConfigField = 'headers' | 'data' | 'params' | 'method' | 'url' | 'body';
/**
 * setToken
 *
 * Helper function to authenticate your requests
 *
 * @param token
 */
export const setToken = (token: string) => {
  // token
  return baseRequest.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`
      }
    };
  });
};
export const removeToken = () => {
  return baseRequest.interceptors.request.use((config) => {
    return {
      ...config,
      headers: omit(['Authorization'], config.headers)
    };
  });
};

const set = (field: ConfigField, value: any) => (object: any) => {
  return !isEmpty(value) ? { ...object, [field]: value } : object;
};

export const isEmpty = (v: any) =>
  v === undefined ||
  v === null ||
  v.length === 0 ||
  (typeof v === 'object' && Object.keys(v).length === 0 && v.constructor === Object);

export const baseRequest = Axios.create({
  baseURL: API_ROOT
});

/** URL */
export const setURL = (url: string) => set('url', url);

/** METHOD */
export const setMethod = (method: 'GET' | 'POST' | 'PUT' | 'DELETE') => set('method', method);

/** Param */
export const setParams = (params: any = {}) => set('params', params);

export const setHeaders = (newHeaders: any = {}) => (object: any) => {
  return !isEmpty(newHeaders) ? { ...object, headers: { ...newHeaders } } : object;
};

/**
 * Validate and set data in the request configuration object.
 */
export const setData = <T extends {}>(
  data: T,
  /**
   * If a schema is provided, execute its validate method. If the validation fails, the
   * errors will be set at L.validationError's path.
   */
  schema?: any,
  /**
   * postValidationTransform will be applied to the data just before it's set on the configuration
   * object, after the validation has happened. Use with caution: It was created as a trap door for
   * merging IPv4 addresses and ports in the NodeBalancer creation flow.
   */
  postValidationTransform?: (v: any) => any
) => {
  if (!schema) {
    return set('data', data);
  }

  const updatedData = typeof postValidationTransform === 'function' ? postValidationTransform(data) : data;

  try {
    return set('data', updatedData);
  } catch (error) {
    return (object: any) => ({
      ...object,
      data: updatedData,
      validationErrors: JSON.stringify(error)
    });
  }
};
/** X-Filter */
export const setXFilter = (xFilter: any) => {
  return (object: any) =>
    !isEmpty(xFilter)
      ? {
          ...object,
          headers: { ...object.headers, 'X-Filter': JSON.stringify(xFilter) }
        }
      : object;
};

/**
 * Builds up a config starting from a default object and applying
 * each of the applied functions.
 *
 * URL is defaulted for testing purposes; otherwise all requests will
 * fail unless setURL() is used in the chain.
 *
 * Config is defaulted to an empty object because setHeaders() merges
 * with the existing headers object, unlike all other setters which directly
 * assign the value. If setHeaders() is called and no headers are present, the result
 * is an error.
 * @param fns An array of functions to be applied to the config object.
 */
const reduceRequestConfig = (...fns: Function[]): RequestConfig =>
  fns.reduceRight((result, fn) => fn(result), {
    url: API_ROOT,
    headers: {}
  });

/** Generator */
export const requestGenerator = <T>(...fns: Function[]): Promise<T> => {
  const config = reduceRequestConfig(...fns);
  if (config.validationErrors) {
    return Promise.reject(
      config.validationErrors // All failed requests, client or server errors, should be APIError[]
    );
  }

  return baseRequest(config).then((response) => response.data);
  // .catch(err => console.(err.response));

  /*
   * If in the future, we want to hook into every single
   * async action for the purpose of sending the request data
   * to Google Tag Manager, we can uncomment out the following
   * .then() and .catch() on return Axios(config)
   */

  // .then(response => {
  //   /*
  //    * This is sending an event to the Google Tag Manager
  //    * data layer. This is important because it lets us track
  //    * async actions as custom events
  //    */
  //   if ((window as any).dataLayer) {
  //     (window as any).dataLayer = (window as any).dataLayer || [];
  //     (window as any).dataLayer.push({
  //       'event': 'asyncActionSuccess',
  //       'url': response.config.url,
  //       'method': response.config.method,
  //     });
  //   };
  //   return response;
  // })
  // .catch(e => {
  //   /*
  //    * This is sending an event to the Google Tag Manager
  //    * data layer. This is important because it lets us track
  //    * async actions as custom events
  //    */
  //   if ((window as any).dataLayer) {
  //     (window as any).dataLayer = (window as any).dataLayer || [];
  //     (window as any).dataLayer.push({
  //       'event': 'asyncActionFailure',
  //       'url': e.response.config.url,
  //       'method': e.response.config.method,
  //     });
  //   };
  //   return Promise.reject(e);
  // });
};

/**
 * Mock Error Function
 *
 * Use this function in place of your API request to mock errors. This returns the same
 * same response body as an Axios error.
 *
 * @example getApi = () => mockAPIError();
 * @example getApi = () => mockAPIError(404, 'Not Found');
 * @example getApi = () => mockAPIError(404, 'Not Found');
 */
export const mockAPIError = (
  status: number = 400,
  statusText: string = 'Internal Server Error',
  data: any = {}
): Promise<AxiosError> =>
  new Promise((resolve, reject) =>
    setTimeout(
      () =>
        reject(
          createError(`Request failed with a status of ${status}`, {
            data,
            status,
            statusText,
            headers: {},
            config: {}
          })
        ),
      process.env.NODE_ENV === 'test' ? 0 : 250
    )
  );

const createError = (message: string, response: AxiosResponse) => {
  const error = new Error(message) as any;
  error.response = response;
  return error;
};

interface CancellableRequest<T> {
  request: () => Promise<T>;
  cancel: () => void;
}

export const CancellableRequest = <T>(...fns: Function[]): CancellableRequest<T> => {
  const config = reduceRequestConfig(...fns);
  const source = Axios.CancelToken.source();

  if (config.validationErrors) {
    return {
      cancel: () => null,
      request: () =>
        Promise.reject({
          config: { ...config, validationErrors: undefined },
          response: { data: { errors: config.validationErrors } }
        })
    };
  }

  return {
    cancel: source.cancel,
    request: () => baseRequest({ ...config, cancelToken: source.token }).then((response) => response.data)
  };
};

export default requestGenerator;
