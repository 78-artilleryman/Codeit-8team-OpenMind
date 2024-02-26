import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  width: 220px;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  border: 1px solid var(--gray40, #818181);
  background: var(--gray10, #fff);
  font-family: Pretendard;
`;

const CardHeader = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;

const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Profile = styled.img`
  width: 60px;
  height: 60px;
`;

const Title = styled.h2`
  color: var(--gray60, #000);
  font-size: 20px;
  font-weight: 400;
`;

function CardItem() {
  return (
    <Card>
      <CardHeader>
        <Profile src="" alt="" />
        <Title>아초는 고양이</Title>
      </CardHeader>
      <CardFooter>
        <div></div>
        <p>9개</p>
      </CardFooter>
    </Card>
  );
}

export default CardItem;
