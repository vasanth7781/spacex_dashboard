import { multiply } from 'ramda';

/**
 * getOffset- method toreturn number of records needsto be offset
 */
export default (totalLimit: number, page: any) => {
  return multiply(Number(page), Number(totalLimit));
};
