import React from 'react';
import styled from 'styled-components';

const ProfileImage = styled.img`
  width: 136px;
  height: 136px;
  border-radius: 50%;

  object-fit: cover;
`;
const Avatar = ({ imageSrc, className, children }) => {
  return (
    <>
      <ProfileImage src={imageSrc} className={className} />
    </>
  );
};

export default Avatar;
