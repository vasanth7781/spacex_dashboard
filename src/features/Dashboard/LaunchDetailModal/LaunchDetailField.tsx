import React from 'react';

interface Props {
  name: string;
  value: any;
}
const LaunchDetailField: React.FC<Props> = (props: Props) => {
  return (
    <div className={'row'}>
      <div className={'col'}>{props.name}</div>
      <div className={'col'}>{props.value}</div>
    </div>
  );
};

export default LaunchDetailField;
