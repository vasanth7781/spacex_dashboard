import styled from 'styled-components';

export const DashBoardWrapper = styled.div`
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
  &.dasboard__wrapper .rs-tag-green {
    background: #def7ec;
    border-radius: 20px;
    color: #03543f;
  }
  &.dasboard__wrapper .rs-tag-red {
    color: rgba(152, 27, 28, 1);
    background: #fde2e1;
    border-radius: 20px;
  }
  &.dasboard__wrapper .dashboard__header .rs-table-row-header,
  .dasboard__wrapper .dashboard__header .rs-table-row-header .rs-table-cell {
    background: #f4f5f7;
  }
  &.rs-table-row-header .rs-table-cell {
    background: #f4f5f7;
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
    display: flex;
    justify-content: center;
    border-radius: 0px;
  }
`;
