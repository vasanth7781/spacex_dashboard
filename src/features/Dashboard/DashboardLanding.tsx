import React, { useEffect } from 'react';
import { useLocation, RouteComponentProps, withRouter } from 'react-router-dom';
import { withState, compose } from 'recompose';
import usePaginatedLaunches from 'hooks/usePaginatedLaunches';
import { GET_LAUNCHES, ZERO, TOTAL_OFFSET_PER_PAGE, ONE } from 'features/constants';
import TableWrapperLanding from './TableWrapper';
import getOffset from 'features/utilities/getOffset';
import PaginationWrapperLanding from './PaginationWrapper';
import DashboardHeaderLanding from './DashboardHeader';
import { isEmpty, isNil, lensPath, pathOr, set, omit } from 'ramda';
import LaunchDetailModalLanding from './LaunchDetailModal';
import { DashBoardWrapper } from 'features/StyledComponents/DashBoardWrapper';
import * as qs from 'query-string';

interface DashBoardStateProps {
  dashState: any;
  handleDashboardStateChange: any;
}

type CombinedProps = DashBoardStateProps & RouteComponentProps<{}>;

const DashboardLanding: React.FC<CombinedProps> = (props: CombinedProps) => {
  const { handleDashboardStateChange, dashState } = props;
  const { lauchCall, loading, data } = usePaginatedLaunches();
  const { search } = useLocation();
  const parsedQs = qs.parse(search);
  const handleIntialCall = () => {
    return handleApiCall(pathOr({}, ['queryParam'], dashState));
  };
  const handleApiCall = (qs: any) => {
    return lauchCall(pathOr(GET_LAUNCHES, ['selectedLaunch'], qs), {
      ...omit(['selectedLaunch', 'selectedDateFilter'], qs)
    });
  };
  const handleIntitalCallWithQs = (_parsedQs: any) => {
    handleApiCall(_parsedQs);
  };
  const handleUrlChange = (queryString: any) => {
    const _qs = qs.stringify(queryString);
    window.history.replaceState(null, '', `?${_qs}`);
  };
  useEffect(() => {
    if (!isEmpty(parsedQs) && !isNil(parsedQs)) {
      handleDashboardStateChange(
        compose(
          set(lensPath(['queryParam']), parsedQs),
          set(lensPath(['selectedLaunch']), pathOr('', ['selectedLaunch'], parsedQs))
        )(dashState)
      );
      handleIntitalCallWithQs(parsedQs);
      return;
    }
    handleIntialCall();

    // eslint-disable-next-line
  }, []);

  return (
    <DashBoardWrapper className={'dasboard__wrapper'}>
      <div className={'dashboard__header'}>
        <DashboardHeaderLanding
          state={dashState}
          handleStateChangeFn={handleDashboardStateChange}
          apiCallFn={lauchCall}
          handleIntialCall={handleApiCall}
          handleUrlChange={handleUrlChange}
        />
      </div>
      <div className={'launch-table'}>
        <TableWrapperLanding
          state={dashState}
          data={data}
          loading={loading}
          handleStateChange={handleDashboardStateChange}
        />
      </div>
      <div className={'dashboard__pagination pt-3'}>
        <PaginationWrapperLanding
          state={dashState}
          handlePageChangeFn={handleDashboardStateChange}
          apiCallFn={lauchCall}
          handleUrlChange={handleUrlChange}
        />
      </div>
      <LaunchDetailModalLanding
        state={dashState}
        handleUrlChange={handleUrlChange}
        handleStateChange={handleDashboardStateChange}
      />
    </DashBoardWrapper>
  );
};

export default compose<any, any>(
  withState('dashState', 'handleDashboardStateChange', {
    selectedLaunch: GET_LAUNCHES,
    page: ONE,
    queryParam: {
      limit: TOTAL_OFFSET_PER_PAGE,
      offset: getOffset(TOTAL_OFFSET_PER_PAGE, ZERO)
    }
  }),
  withRouter
)(DashboardLanding);
