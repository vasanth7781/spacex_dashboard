import { LaunchModaWrapper } from 'features/StyledComponents/LaunchModaWrapper';
import { formatTimeStamp } from 'momentUtilities';
import { lensPath, pathOr, set } from 'ramda';
import React from 'react';
import { compose } from 'recompose';
import { Avatar, Divider, Modal } from 'rsuite';
import LaunchDetailField from './LaunchDetailField';
import LaunchModalDetailHeader from './LaunchDetailModalHeader';

interface Props {
  state: any;
  handleStateChange: any;
  handleUrlChange: any;
}

const LaunchDetailModalLanding: React.FC<Props> = (props: Props) => {
  const { state, handleStateChange } = props;
  const handleStateComposeChange = (setFns: any) => {
    handleStateChange(compose(...setFns)(state));
  };
  const handleModalClose = () => {
    handleStateComposeChange([set(lensPath(['launchModal', 'isLaunchDetailModal']), false)]);
  };
  const launchData = pathOr({}, ['launchModal', 'data'], state);
  return (
    <Modal
      overflow={true}
      show={pathOr(false, ['launchModal', 'isLaunchDetailModal'], state)}
      onHide={() => handleModalClose()}
    >
      <LaunchModaWrapper className={'launch__modal p-3'}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div>
            <div className={'d-flex'}>
              <div>
                <Avatar className={'launch-image'} src={pathOr('', ['links', 'mission_patch'], launchData)} />
              </div>
              <LaunchModalDetailHeader launchData={launchData} />
            </div>

            <div className={'my-3'}>
              {pathOr('', ['details'], launchData) && (
                <span>
                  {pathOr('', ['details'], launchData)}.{' '}
                  <a href={pathOr('', ['links', 'wikipedia'], launchData)} rel="noreferrer" target="_blank">
                    Wikipedia
                  </a>
                </span>
              )}
            </div>

            <div className={''} style={{ overflow: 'hidden' }}>
              <LaunchDetailField name={'Flight Number'} value={pathOr('', ['flight_number'], launchData)} />
              <Divider />
              <LaunchDetailField name={'Mission Name'} value={pathOr('', ['mission_name'], launchData)} />
              <Divider />
              <LaunchDetailField name={'Rocket Type'} value={pathOr('', ['rocket', 'rocket_type'], launchData)} />
              <Divider />
              <LaunchDetailField name={'Rocket Name'} value={pathOr('', ['rocket', 'rocket_name'], launchData)} />
              <Divider />
              <LaunchDetailField
                name={'Manufacturer'}
                value={pathOr('', ['rocket', 'second_stage', 'payloads', 0, 'manufacturer'], launchData)}
              />
              <Divider />
              <LaunchDetailField
                name={'Nationality'}
                value={pathOr('', ['rocket', 'second_stage', 'payloads', 0, 'nationality'], launchData)}
              />
              <Divider />
              <LaunchDetailField
                name={'Launch Date'}
                value={formatTimeStamp(pathOr('', ['launch_date_utc'], launchData))}
              />
              <Divider />
              <LaunchDetailField
                name={'Payload Type'}
                value={pathOr('', ['rocket', 'second_stage', 'payloads', 0, 'payload_type'], launchData)}
              />
              <Divider />
              <LaunchDetailField
                name={'Orbit'}
                value={pathOr('', ['rocket', 'second_stage', 'payloads', 0, 'orbit'], launchData)}
              />
              <Divider />
              <LaunchDetailField name={'Launch Site'} value={pathOr('', ['launch_site', 'site_name'], launchData)} />
            </div>
          </div>
        </Modal.Body>
      </LaunchModaWrapper>
    </Modal>
  );
};
export default LaunchDetailModalLanding;
