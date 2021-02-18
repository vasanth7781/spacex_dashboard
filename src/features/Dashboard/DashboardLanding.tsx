import React, { useEffect } from 'react';
import styled from 'styled-components';
import { withState, compose } from 'recompose';
import usePaginatedLaunches from 'hooks/usePaginatedLaunches';
import { GET_LAUNCHES, ZERO, TOTAL_OFFSET_PER_PAGE } from 'features/constants';
import TableWrapperLanding from './TableWrapper';
import getOffset from 'features/utilities/getOffset';
import PaginationWrapperLanding from './PaginationWrapper';
import DashboardHeaderLanding from './DashboardHeader';

interface DashBoardStateProps {
  dashState: any;
  handleDashboardStateChange: any;
}

type CombinedProps = DashBoardStateProps;

const DashboardLanding: React.FC<CombinedProps> = (props: CombinedProps) => {
  const { handleDashboardStateChange, dashState } = props;
  const { lauchCall, loading, data } = usePaginatedLaunches();
  useEffect(() => {
    lauchCall(GET_LAUNCHES, { limit: TOTAL_OFFSET_PER_PAGE, offset: getOffset(TOTAL_OFFSET_PER_PAGE, ZERO) });
  }, []);
  return (
    <DashBoardWrapper className={'dasboard__wrapper'}>
      <div className={'dashboard__header'}>
        <DashboardHeaderLanding />
      </div>
      <div className={'launch-table'}>
        <TableWrapperLanding data={data} loading={loading} />
      </div>
      <div className={'dashboard__pagination pt-3'}>
        <PaginationWrapperLanding
          state={dashState}
          handlePageChangeFn={handleDashboardStateChange}
          apiCallFn={lauchCall}
        />
      </div>
    </DashBoardWrapper>
  );
};
const DashBoardWrapper = styled.div`
  &.dasboard__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  &.dasboard__wrapper .dashboard__pagination {
    width: 900px;
    text-align: end;
  }
  &.dasboard__wrapper .dashboard__header {
    width: 900px;
  }
  &.dasboard__wrapper .dashboard__header .dashboard-header {
    width: 900px;
    display: flex;
    justify-content: space-between;
  }

  &.dasboard__wrapper .launch-table {
    border: solid;
    border-color: #e4e4e7;
    border-width: 1px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  }

  &.dasboard__wrapper .rs-pagination > .rs-pagination-btn-disabled > a,
  .rs-pagination > .rs-pagination-btn-disabled > a:hover,
  .rs-pagination > .rs-pagination-btn-disabled > a:active,
  .rs-pagination > .rs-pagination-btn-disabled > a:focus,
  .rs-pagination > li:not(.rs-pagination-btn-disabled) > a,
  .rs-pagination > li.rs-pagination-btn-active > a {
    border: solid;
    border-width: 1px;
    border-color: #e4e4e7;
    padding: 10px;
    height: 40px;
    width: 40px;
    font-weight: 600;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  }
`;
export default compose<any, any>(withState('dashState', 'handleDashboardStateChange', {}))(DashboardLanding);
