import React from 'react';
import styled from 'styled-components';
import CardList from 'components/list/CardList';
import LogoBox from 'components/common/LogoBox';
import Button from 'components/common/Button';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1020px;
  padding: 40px 40px;
  margin: 0 auto;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const MainLogo = styled(LogoBox)`
  display: flex;
  width: 146px;
  justify-content: center;
  align-items: center;
`;

const HeadButton = styled(Button)`
  @media (max-width: 767px) {
    width: 130px;
    height: 42px;
    font-size: 14px;
    padding: 8px 12px;
  }
`;

const List = () => {
  return (
    <>
      <Header>
        <MainLogo />
        <HeadButton width={160} bright={true}>
          답변하러 가기
        </HeadButton>
      </Header>
      <CardList />
    </>
  );
};

export default List;
