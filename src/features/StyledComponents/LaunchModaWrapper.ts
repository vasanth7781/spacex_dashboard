import styled from 'styled-components';

export const LaunchModaWrapper = styled.div`
  &.launch__modal {
    width: 545px;
  }
  &.launch__modal .rs-divider-horizontal {
    height: 1px;
    margin: 14px 0;
  }
  &.launch__modal .launch-image {
    height: 72px;
    width: 72px;
  }
  &.launch__modal .rs-modal-body {
    margin-top: 0px;
  }
  &.launch__modal .launch-image a {
    width: inherit;
    height: inherit;
  }
  &.launch__modal .launch-header {
    margin-left: 20px;
  }
  &.launch__modal .rs-tag {
    border-radius: 24px;
  }
  &.launch__modal .rs-tag-green {
    background-color: #def7ec;
    color: #03543f;
  }
`;
