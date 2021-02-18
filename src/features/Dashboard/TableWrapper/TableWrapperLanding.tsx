import React from 'react';
import { Table, Tag } from 'rsuite';
import { pathOr } from 'ramda';
import { formatTimeStamp } from 'momentUtilities';
import getStatus from 'features/utilities/getStatus';

interface Props {
  data: any;
  loading: boolean;
}

type CombinedProps = Props;
const TableWrapperLanding: React.FC<CombinedProps> = (props: CombinedProps) => {
  const { data, loading } = props;
  return (
    <Table data={data} loading={loading} height={580} width={900}>
      <Table.Column width={50} align="center" fixed>
        <Table.HeaderCell className={'table-header'}>No:</Table.HeaderCell>
        <Table.Cell dataKey="flight_number" />
      </Table.Column>
      <Table.Column flexGrow={2} align="center" fixed>
        <Table.HeaderCell className={'table-header'}>Launched(UTC)</Table.HeaderCell>
        <Table.Cell dataKey="launch_date_utc">
          {(rowData: any) => {
            return <span>{formatTimeStamp(pathOr('', ['launch_date_utc'], rowData))}</span>;
          }}
        </Table.Cell>
      </Table.Column>
      <Table.Column width={150} align="center" fixed>
        <Table.HeaderCell className={'table-header'}>Location</Table.HeaderCell>
        <Table.Cell dataKey="launch_site">
          {(rowData: any) => {
            return <span>{pathOr('', ['launch_site', 'site_name'], rowData)}</span>;
          }}
        </Table.Cell>
      </Table.Column>
      <Table.Column flexGrow={1} align="center" fixed>
        <Table.HeaderCell className={'table-header'}>Mission</Table.HeaderCell>
        <Table.Cell dataKey="mission_name" />
      </Table.Column>
      <Table.Column flexGrow={1} align="center" fixed>
        <Table.HeaderCell className={'table-header'}>Oribit</Table.HeaderCell>
        <Table.Cell dataKey="launch_date_utc">
          {(rowData: any) => {
            return <span>{pathOr('', ['rocket', 'second_stage', 'payloads', 0, 'orbit'], rowData)}</span>;
          }}
        </Table.Cell>
      </Table.Column>
      <Table.Column flexGrow={1} align="center" fixed>
        <Table.HeaderCell className={'table-header'}>Launched status</Table.HeaderCell>
        <Table.Cell dataKey="launch_date_utc">
          {(rowData: any) => {
            const { status, color } = getStatus(pathOr(true, ['launch_site', 'launch_success'], rowData));
            return (
              <span>
                <Tag color={color}>{status}</Tag>
              </span>
            );
          }}
        </Table.Cell>
      </Table.Column>
      <Table.Column flexGrow={1} align="center" fixed>
        <Table.HeaderCell className={'table-header'}>Rocket</Table.HeaderCell>
        <Table.Cell dataKey="launch_date_utc">
          {(rowData: any) => {
            return <span>{pathOr('', ['rocket', 'rocket_name'], rowData)}</span>;
          }}
        </Table.Cell>
      </Table.Column>
    </Table>
  );
};

export default TableWrapperLanding;
