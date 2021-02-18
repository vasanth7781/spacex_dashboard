import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

interface Props {
  children: JSX.Element;
}

const AppWrapper: React.FC<Props> = (props: Props) => {
  return (
    <StyledAppWrapper className={'app__warpper row'} style={{ height: '97vh' }}>
      <div className={'col-12 col-md-12 header__wrap align-content-center'}>
        <Logo />
      </div>
      <div className={'col-12 col-md-12'}>{props.children}</div>
    </StyledAppWrapper>
  );
};

const StyledAppWrapper = styled.div`
  &.app__warpper .header__wrap {
    background-color: #ffffff;
    height: 72px;
  }
  &.app__warpper svg {
    margin-top: 25px;
  }
`;

export default AppWrapper;
