import React from 'react';
import { Pagination } from 'rsuite';
import { divide, lensPath, multiply, pathOr, set, subtract } from 'ramda';
import { GET_LAUNCHES, ONE, TOTAL_NUMBER_OF_DATAS, TOTAL_OFFSET_PER_PAGE } from 'features/constants';

interface Props {
  state: any;
  handlePageChangeFn: any;
  apiCallFn: any;
}

type CombinedProps = Props;

const PaginationWrapperLanding: React.FC<CombinedProps> = (props: CombinedProps) => {
  const { state, handlePageChangeFn, apiCallFn } = props;
  return (
    <Pagination
      prev={true}
      next={true}
      pages={divide(Number(TOTAL_NUMBER_OF_DATAS), Number(TOTAL_OFFSET_PER_PAGE))}
      maxButtons={5}
      activePage={pathOr(1, ['page'], state)}
      onSelect={(e: any, ev: any) => {
        handlePageChangeFn(set(lensPath(['page']), e, state));
        apiCallFn(GET_LAUNCHES, {
          limit: TOTAL_OFFSET_PER_PAGE,
          offset: multiply(subtract(Number(e), ONE), TOTAL_OFFSET_PER_PAGE)
        });
      }}
    />
  );
};

export default PaginationWrapperLanding;
