import {
  DEFAULT_NAME,
  GET_LAUNCHES,
  ONE,
  TOTAL_OFFSET_PER_PAGE,
  TYPES_OF_LAUNCHES,
  TYPE_OF_DATE_FILTERS
} from 'features/constants';
import { lensPath, multiply, pathOr, set, subtract, omit, equals } from 'ramda';
import React from 'react';
import { SelectPicker } from 'rsuite';
import { compose } from 'recompose';
import getDiffDates from 'features/utilities/getDiffDates';

const SelectPicked = (value: any, item: any) => <div>{pathOr('', ['label'], item)}</div>;

interface Props {
  handleStateChangeFn: any;
  apiCallFn: (activity: any, queryParam: any) => Promise<void>;
  state: any;
  handleIntialCall: (state: any) => void;
  handleUrlChange: (queryString: any) => void;
}

const DashboardHeaderLanding: React.FC<Props> = (props: Props) => {
  const { handleStateChangeFn, apiCallFn, state, handleIntialCall, handleUrlChange } = props;

  /*
  this function is for handling upcoming,failure launches,etc.., filters,so if its default means
  we dont do any api calls,if its changes from default then forming the state and updating state
  queryparams of url and making an api call using updated values
  */
  const handleLauncheSelect = (value: string, item: any, e: any) => {
    if (equals(value, DEFAULT_NAME)) {
      return;
    }
    const offset = multiply(subtract(Number(ONE), ONE), TOTAL_OFFSET_PER_PAGE);
    const updatedQuerParams = {
      ...pathOr({}, ['queryParam'], state),
      selectedLaunch: pathOr('', ['value'], item),
      limit: TOTAL_OFFSET_PER_PAGE,
      offset
    };
    const updatedState = compose(
      set(lensPath(['page']), ONE),
      set(lensPath(['selectedLaunch']), pathOr('', ['value'], item)),
      set(lensPath(['queryParam', 'limit']), TOTAL_OFFSET_PER_PAGE),
      set(lensPath(['queryParam', 'offset']), offset),
      set(lensPath(['queryParam', 'selectedLaunch']), pathOr('', ['value'], item))
    )(state);
    handleStateChangeFn(updatedState);
    handleUrlChange(updatedQuerParams);
    apiCallFn(pathOr('', ['value'], item), omit(['selectedLaunch', 'selectedDateFilter'], updatedQuerParams));
  };
  /*
  this function is for handling past month,past 3 monrth launches,etc..,date filters,date filters are changes by forming the state and updating state
  queryparams of url and making an api call using updated values
  */
  const getDatesFn = (startDate: string, lastDate: string, dateFilterKey: any) => {
    const updatedQueryParams = compose(
      set(lensPath(['queryParam', 'start']), startDate),
      set(lensPath(['queryParam', 'end']), lastDate),
      set(lensPath(['queryParam', 'selectedDateFilter']), dateFilterKey)
    )(state);

    handleStateChangeFn(updatedQueryParams);
    handleUrlChange(pathOr({}, ['queryParam'], updatedQueryParams));
    apiCallFn(
      pathOr('', ['selectedLaunch'], updatedQueryParams),
      omit(['selectedDateFilter', 'selectedLaunch'], pathOr({}, ['queryParam'], updatedQueryParams))
    );
  };

  const handleDateSelection = (value: string, item: any, e: any) => {
    return getDiffDates(pathOr('', ['value'], item), getDatesFn);
  };
  /*
this method used for handling clearing filters of upcoming,success launches,etc..,
then removing the appropirate values from state and make an api call with cleared filters
*/
  const handleCloseFilter = () => {
    const queryParams = {
      ...omit(['selectedLaunch'], pathOr({}, ['queryParam'], state)),
      selectedLaunch: GET_LAUNCHES
    };
    handleUrlChange(queryParams);
    const updatedState = compose(
      set(lensPath(['selectedLaunch']), GET_LAUNCHES),
      set(lensPath(['queryParam']), queryParams)
    )(state);
    handleStateChangeFn(updatedState);
    handleIntialCall(queryParams);
  };
  /*
this method used for handling clearing filters of date selection
then removing the appropirate date filters values from state and make an api call with cleared filters
*/
  const handleDateFilterClose = () => {
    const queryParams = {
      ...omit(['start', 'end', 'selectedDateFilter'], pathOr({}, ['queryParam'], state))
    };
    const updatedState = compose(set(lensPath(['queryParam']), queryParams))(state);
    handleStateChangeFn(updatedState);
    handleUrlChange(queryParams);
    handleIntialCall(queryParams);
  };

  return (
    <div className={'dashboard-header py-5'}>
      <div>
        <SelectPicker
          data={TYPE_OF_DATE_FILTERS}
          searchable={false}
          style={{ width: 224 }}
          value={pathOr(DEFAULT_NAME, ['queryParam', 'selectedDateFilter'], state)}
          placeholder="Select filter"
          renderMenuItem={SelectPicked}
          renderValue={SelectPicked}
          onSelect={handleDateSelection}
          onClean={handleDateFilterClose}
        />
      </div>
      <div>
        <SelectPicker
          data={TYPES_OF_LAUNCHES}
          style={{ width: 224 }}
          placeholder="All Launches"
          value={pathOr('', ['selectedLaunch'], state)}
          onSelect={handleLauncheSelect}
          renderMenuItem={SelectPicked}
          renderValue={SelectPicked}
          onClean={() => handleCloseFilter()}
        />
      </div>
    </div>
  );
};
export default DashboardHeaderLanding;
