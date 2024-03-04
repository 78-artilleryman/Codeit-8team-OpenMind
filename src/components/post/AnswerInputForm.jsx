import styled from 'styled-components';
import Button from 'components/common/Button';
import { useState } from 'react';
import { createAnswer } from 'api';

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

const AnswerInputForm = ({ placeholder, children, questionId }) => {
  const [answer, setAnswer] = useState('');

  const handleChange = e => {
    setAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    createAnswer(questionId, answer);
    window.location.reload();
  };

  return (
    <Container>
      <StyledTextArea placeholder={placeholder} onChange={handleChange}>
        {children}
      </StyledTextArea>
      <Button inactive={answer === ''} onClick={handleSubmitAnswer}>
        답변완료
      </Button>
    </Container>
  );
};

export default AnswerInputForm;
