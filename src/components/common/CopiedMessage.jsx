import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  width: 20%;
  padding: 12px;
  text-align: center;
  font-size: 14px;
  border-radius: 15px;
  box-shadow: 3px 5px 7px 0 #636161;

  position: fixed;
  bottom: 5%;
  margin: auto;
  left: 0;
  right: 0;
`;
const CopiedMessage = ({ show }) => {
  return show && <StyledBox>클립보드에 복사되었습니다.</StyledBox>;
};

export default CopiedMessage;
