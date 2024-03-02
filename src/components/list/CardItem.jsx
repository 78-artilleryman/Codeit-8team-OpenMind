import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  width: 100%;
  min-width: 186px;
  height: 187px;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  border: 1px solid var(--gray40, #818181);
  background: var(--gray10, #fff);
  font-family: Pretendard;

  @media (max-width: 661px) {
    min-width: 155.5px;
    padding: 16px;
  }
`;

const CardHeader = styled.div`
  width: 100%;
  margin-bottom: 12px;

  @media (max-width: 661px) {
    min-width: 123.5px;
  }
`;

const Profile = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 12px;

  @media (max-width: 661px) {
    width: 48px;
    height: 48px;
  }
`;

const Title = styled.h2`
  color: var(--gray60, #000);
  font-size: 20px;
  font-weight: 400;
`;

const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`;

const MessageIcon = styled.img`
  width: 18px;
  height: 18px;
  @media (max-width: 661px) {
    width: 16px;
    height: 16px;
  }
`;

const Text = styled.p`
  color: var(--gray40, #818181);
  font-size: 16px;
  font-weight: 400;

  @media (max-width: 661px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

const CardItem = ({ name, imageSource, questionCount }) => {
  return (
    <Card>
      <CardHeader>
        <Profile src={imageSource} alt="profile" />
        <Title>{name}</Title>
      </CardHeader>
      <CardFooter>
        <CommentBox>
          <MessageIcon src="/icons/commentIcon.png" alt="comment" />
          <Text>받은 질문</Text>
        </CommentBox>
        <Text>{questionCount}</Text>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
