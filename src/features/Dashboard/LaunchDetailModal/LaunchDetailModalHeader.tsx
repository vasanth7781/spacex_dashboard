import React from 'react';
import { Tag } from 'rsuite';
import { pathOr } from 'ramda';
import getStatus from 'features/utilities/getStatus';

interface Props {
  launchData: any;
}
const LaunchModalDetailHeader: React.FC<Props> = (props: Props) => {
  const { launchData } = props;
  const { status, color } = getStatus(pathOr('', ['launch_success'], launchData));

  return (
    <div className={'launch-header'}>
      <div className={'d-flex'}>
        <h5 className={'mx-2'} style={{ color: '#1F2937' }}>
          {pathOr('', ['mission_name'], launchData)}
        </h5>
        <span className={'mx-2'}>
          <Tag color={color}>{status}</Tag>
        </span>
      </div>
      <div className={'mx-2 my-1'}>
        <span style={{ color: '#374151' }}>{pathOr('', ['rocket', 'rocket_name'], launchData)}</span>
      </div>
      <div>
        <a className={'m-2'} href={pathOr('', ['links', 'article_link'], launchData)} target="_blank" rel="noreferrer">
          <img className={'nasa'} alt={''} />
        </a>

        <a className={'m-2'} href={pathOr('', ['links', 'video_link'], launchData)} target="_blank" rel="noreferrer">
          {' '}
          <img className={'youtube '} alt={''} />
        </a>
        <a className={'m-2'} href={pathOr('', ['links', 'wikipedia'], launchData)} target="_blank" rel="noreferrer">
          {' '}
          <img className={'wikipedia'} alt={''} />
        </a>
      </div>
    </div>
  );
};
export default LaunchModalDetailHeader;
