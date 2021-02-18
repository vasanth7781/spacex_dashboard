import { TYPES_OF_LAUNCHES } from 'features/constants';
import React from 'react';
import { SelectPicker } from 'rsuite';

const SelectPicked = (value: any, item: any) => <div>{value}</div>;
const DashboardHeaderLanding: React.FC = () => {
  return (
    <div className={'dashboard-header py-5'}>
      <div>
        <SelectPicker
          data={[]}
          style={{ width: 224 }}
          placeholder="Past 6 months"
          renderMenuItem={SelectPicked}
          renderValue={SelectPicked}
        />
      </div>
      <div>
        <SelectPicker
          data={TYPES_OF_LAUNCHES}
          style={{ width: 224 }}
          placeholder="All Launches"
          renderMenuItem={SelectPicked}
          renderValue={SelectPicked}
        />
      </div>
    </div>
  );
};
export default DashboardHeaderLanding;
