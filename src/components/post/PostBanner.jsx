import React from 'react';
import LogoBox from 'components/common/LogoBox';
import Avatar from 'components/common/Avatar';
import styled from 'styled-components';

const BannerContainer = styled.div`
  height: 234px;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  background: url('/images/background_image.svg') no-repeat center;
  background-size: cover;

  @media (max-width: 767px) {
    background-size: auto;
  }
`;

const PostLogo = styled(LogoBox)`
  margin-top: 5%;
  width: 170px;

  @media (max-width: 767px) {
    width: 124px;
  }
`;

const PostAvatar = styled(Avatar)`
  position: absolute;
  bottom: -36px;
  left: 0;
  right: 0;
  margin: auto;

  @media (max-width: 767px) {
    width: 104px;
    height: 104px;
  }
`;

const PostUserName = styled.div`
  position: absolute;
  bottom: -80px;

  font-size: 32px;
  font-weight: 400;
`;

const PostBanner = ({ userProfileImage, userName }) => {
  return (
    <BannerContainer>
      <PostLogo />
      <PostAvatar imageSrc={userProfileImage} />
      <PostUserName>{userName}</PostUserName>
    </BannerContainer>
  );
};

export default PostBanner;
