import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { createquestion } from 'api';
import { useParams } from 'react-router-dom';

const EditorContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-family: Pretendard;
`;

const TextArea = styled.textarea`
  width: 100%;
  border-radius: 8px;
  padding: 16px;
  background: var(--gray20, #f9f9f9);
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  resize: none;
  height: ${({ height }) => height}px;
  border: none;
`;

const Editor = ({ placeholder, width, height, ModalClose }) => {
  const [question, setQuestion] = useState('');
  const { postId } = useParams();

  const questionValueHandler = e => {
    setQuestion(e.target.value);
  };

  const handlePostQuestion = () => {
    createquestion(postId, question);
    setQuestion('');
    ModalClose();
  };

  return (
    <EditorContainer>
      <TextArea
        cols="30"
        rows="10"
        placeholder={placeholder}
        height={height}
        onChange={questionValueHandler}
        value={question}
      ></TextArea>
      <Button
        onClick={handlePostQuestion}
        inactive={question.length === 0}
        width={width}
      >
        질문 보내기
      </Button>
    </EditorContainer>
  );
};

export default Editor;
