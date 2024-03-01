import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.span`
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 12px;
  text-align: center;
  font-size: 14px;
  border-radius: 15px;
  box-shadow: 3px 5px 7px 0 #636161;

  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  @media (min-width: 0px) and (max-width: 767px) {
    font-size: 12px;
  }
`;
const CopiedMessage = ({ show }) => {
  return show && <StyledBox>클립보드에 복사되었습니다.</StyledBox>;
};

export default CopiedMessage;
