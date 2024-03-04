import React from 'react';
import styled from 'styled-components';
import Button from './Button';

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

const Editor = ({ placeholder, width, height }) => {
  return (
    <EditorContainer>
      <TextArea
        cols="30"
        rows="10"
        placeholder={placeholder}
        height={height}
      ></TextArea>
      <Button width={width}>질문 보내기</Button>
    </EditorContainer>
  );
};

export default Editor;
