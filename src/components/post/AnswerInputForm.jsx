// 답변을 생성하고 수정하는 input 컴포넌트
import styled from 'styled-components';
import Button from 'components/common/Button';
import { useState } from 'react';
import { createAnswer, editAnswer } from 'api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;
const StyledTextArea = styled.textarea`
  width: 100%;
  height: 186px;
  background-color: var(--gray20);
  border: none;
  border-radius: 8px;
  resize: none;
  padding: 16px;

  &::-webkit-scrollbar {
    display: none;
  }

  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const AnswerInputForm = ({
  placeholder,
  children,
  questionId,
  buttonText,
  type,
  answerId,
  onEditCancel,
}) => {
  const [answer, setAnswer] = useState('');

  const handleChange = e => {
    setAnswer(e.target.value);
  };

  const handleCreateAnswer = () => {
    createAnswer(questionId, answer).then(() => window.location.reload());
  };

  const handleEditAnswer = () => {
    editAnswer(answerId, answer).then(() => window.location.reload());
  };

  return (
    <Container>
      <StyledTextArea placeholder={placeholder} onChange={handleChange}>
        {children}
      </StyledTextArea>
      {/*답변을 생성하는 input인 경우 '답변 완료' 버튼 하나, 답변을 수정하는 input인 경우 '수정완료' '수정취소' 두개의 버튼이 나타납니다.*/}
      {/*답변을 생성하는 input인 경우 handleCreateAnswer, 답변을 수정하는 input인 경우 handleEditAnswer 함수를 실행합니다.*/}
      <ButtonContainer>
        <Button
          inactive={answer === ''}
          onClick={
            type === 'create answer' ? handleCreateAnswer : handleEditAnswer
          }
        >
          {buttonText}
        </Button>
        {type === 'edit answer' && (
          <Button onClick={onEditCancel}>수정 취소</Button>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default AnswerInputForm;
