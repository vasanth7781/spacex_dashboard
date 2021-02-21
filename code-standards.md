# Ramda.js usage

[Ramda.js](https://ramdajs.com/docs/) is practical functional library for JavaScript programmers.

1. Instead of using data.value ,we can use pathOr('',['value'],data) from ramda,we can avoid undefined crash errors
2. Instead of using this.data.value = some value, we can use set(lensPath(['value']),somevalue,data)

For example use case we have added two points for ramda.js,for more we can refer their documentations.

Why Ramda?

It gives the quality to your code and most importantly we can avoid crash errors due to undefined ,etc..,

# Compose usage

[Compose](https://github.com/acdlite/recompose) is a React utility belt for function components and higher-order components

Here its used for composing many functions that needs to applied to value or component

# API calls

for adding api calls, we can add it into seperate file in services/\*\*

import Request, { setMethod, setParams, setURL } from 'services/requests' so we have default methods for api calls

1. Request will consists of all methods bundled into it and all method will be called when calling api function
2. setMethod -- for setting the type of api request
3. setParams -- for setting the query params the is going to be consumed by api calls,it will be sent as object key-value pairs
4. setURL -- for setting the url for api call
5. setHeader -- for setting the header to an api calls,it will be sent as object key-value pairs
6. setXFilter -- for setting the filter in header using X-**-** ,it also will be sent as object key-value pairs

**Example usage **
`
import { API_ROOT, GET_REQUEST_NAME } from 'constant';
import Request, { setMethod, setParams, setURL } from 'services/requests';

/\*\*

- getLaunches -service call to get all launches resources
- @param queryParam -can have query params as object {..} it cna be optional
  \*/

export const getLaunches = (queryParam?: any) =>
Request(setURL(`${API_ROOT}/launches`), setMethod(GET_REQUEST_NAME), setParams(queryParam));
`
[Axios](https://www.npmjs.com/package/axios) is used for making api call,instead axios will be setup and the remaing paramters will be set while runtime usage of api functions
