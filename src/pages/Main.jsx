import UserBox from '../components/main/UserBox.jsx';
import LogoBox from '../components/common/LogoBox.jsx';
import styled from 'styled-components';
import Button from '../components/common/Button.jsx';

const HeadButton = styled(Button)`
  position: absolute;
  top: 45px;
  right: 6%;

  @media (max-width: 767px) {
    position: static;
    display: flex;
    justify-content: center;
    margin: 10% auto;
    height: 34px;
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const MainContainer = styled.div`
  background: url('/images/background_image.svg') no-repeat bottom;
  background-size: contain;

  position: relative;
  width: 100%;
  height: 100vh;
`;

const MainLogo = styled(LogoBox)`
  display: flex;
  justify-content: center;
  padding-top: 10%;
  margin: auto;

  width: 456px;

  @media (max-width: 767px) {
    width: 248px;
    height: 98px;
  }
`;

const Main = () => {
  return (
    <>
      <MainContainer>
        <MainLogo />
        <HeadButton width={123} bright={true}>
          질문하러 가기
        </HeadButton>
        <UserBox />
      </MainContainer>
    </>
  );
};

export default Main;
