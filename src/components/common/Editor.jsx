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

const Editor = ({ placeholder, width, height, ModalClose, setPostData }) => {
  const [question, setQuestion] = useState('');
  const { postId } = useParams();

  const questionValueHandler = e => {
    setQuestion(e.target.value);
  };

  const handlePostQuestion = () => {
    createquestion(postId, question)
      .then(res => {
        // 질문을 생성하고 새로운 데이터로 업데이트
        setPostData(prev => [res, ...prev]);
      })
      .catch(error => {
        // 오류 처리
        console.error('질문을 생성하는데 문제가 생겼습니다.', error);
      });
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
        inactive={question.trim().length === 0}
        width={width}
      >
        질문 보내기
      </Button>
    </EditorContainer>
  );
};

export default Editor;
