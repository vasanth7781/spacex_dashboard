import React from 'react';
import { Pagination } from 'rsuite';
import { divide, lensPath, multiply, pathOr, set, subtract } from 'ramda';
import { ONE, TOTAL_NUMBER_OF_DATAS, TOTAL_OFFSET_PER_PAGE } from 'features/constants';
import { compose } from 'recompose';
interface Props {
  state: any;
  handlePageChangeFn: any;
  apiCallFn: (activity: any, queryParam: any) => Promise<void>;
  handleUrlChange: (queryString: any) => void;
}

type CombinedProps = Props;

const PaginationWrapperLanding: React.FC<CombinedProps> = (props: CombinedProps) => {
  const { state, handlePageChangeFn, apiCallFn, handleUrlChange } = props;
  const handlePageSelect = (e: any, ev: any) => {
    const offset = multiply(subtract(Number(e), ONE), TOTAL_OFFSET_PER_PAGE);
    const queryParams = {
      ...pathOr({}, ['queryParam'], state),
      limit: TOTAL_OFFSET_PER_PAGE,
      offset
    };
    handlePageChangeFn(compose(set(lensPath(['page']), e), set(lensPath(['queryParam']), queryParams))(state));
    handleUrlChange(queryParams);
    apiCallFn(pathOr('', ['selectedLaunch'], state), queryParams);
  };
  /* Here one assumption made was we have set toal number of datas as 250,
  since to calculate number of pages and to show it in user,it was not returned from api ,
  so assumption has been made */
  return (
    <Pagination
      prev={true}
      next={true}
      pages={divide(Number(TOTAL_NUMBER_OF_DATAS), Number(TOTAL_OFFSET_PER_PAGE))}
      maxButtons={5}
      activePage={pathOr(1, ['page'], state)}
      onSelect={handlePageSelect}
    />
  );
};

export default PaginationWrapperLanding;
