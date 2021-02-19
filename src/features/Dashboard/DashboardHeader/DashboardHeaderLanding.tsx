import { ONE, TOTAL_OFFSET_PER_PAGE, TYPES_OF_LAUNCHES } from 'features/constants';
import { lensPath, multiply, pathOr, set, subtract } from 'ramda';
import React from 'react';
import { SelectPicker } from 'rsuite';
import { compose } from 'recompose';

const SelectPicked = (value: any, item: any) => <div>{pathOr('', ['label'], item)}</div>;

interface Props {
  handlePageChangeFn: any;
  apiCallFn: (activity: any, queryParam: any) => Promise<void>;
  state: any;
  handleIntialCall: () => void;
}

const DashboardHeaderLanding: React.FC<Props> = (props: Props) => {
  const { handlePageChangeFn, apiCallFn, state, handleIntialCall } = props;

  const handleLauncheSelect = (value: string, item: any, e: any) => {
    const updatedState = compose(
      set(lensPath(['page']), ONE),
      set(lensPath(['selectedLaunch']), pathOr('', ['value'], item))
    )(state);
    handlePageChangeFn(updatedState);
    apiCallFn(pathOr('', ['value'], item), {
      limit: TOTAL_OFFSET_PER_PAGE,
      offset: multiply(subtract(Number(ONE), ONE), TOTAL_OFFSET_PER_PAGE)
    });
  };

  return (
    <div className={'dashboard-header py-5'}>
      <div>
        <SelectPicker
          data={[]}
          style={{ width: 224 }}
          placeholder="Past 6 months"
          renderMenuItem={SelectPicked}
          renderValue={SelectPicked}
          onSelect={(value: string, item: any, e: any) => {}}
        />
      </div>
      <div>
        <SelectPicker
          data={TYPES_OF_LAUNCHES}
          style={{ width: 224 }}
          placeholder="All Launches"
          onSelect={handleLauncheSelect}
          renderMenuItem={SelectPicked}
          renderValue={SelectPicked}
          onClean={() => handleIntialCall()}
        />
      </div>
    </div>
  );
};
export default DashboardHeaderLanding;
