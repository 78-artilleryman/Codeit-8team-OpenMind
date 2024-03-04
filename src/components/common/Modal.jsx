import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import Editor from './Editor';

const BackgroundModal = styled.div`
  background-color: rgba(0, 0, 0, 0.56);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 612px;
  height: 454px;
  padding: 40px 40px 70px 40px;
  border-radius: 24px;
  background-color: var(--gray10);
  box-shadow: 0px 16px 20px 0px rgba(48, 48, 48, 0.62);
  position: fixed;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ModalTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ModalTitle = styled.h1`
  color: var(--gray60);
  font-family: Actor;
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;
`;

const CloseButton = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const ToQuestionBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  color: var(--gray60);
  font-weight: 400;
  font-family: Actor;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 12px;
`;

const TextStyle = styled.h2`
  color: var(--gray60);
  font-weight: 400;
  font-family: Pretendard;
  font-size: 16px;
  line-height: 22px;
`;

const Modal = ({ userName, imageSource, onClick }) => {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // ref.current는 참조 객체의 현재 값(외부 클릭을 감지하고자 하는 대상)
      // ref.current가 event.target을 포함하는지 판단하여 !연산
      // 즉, event.target이 외부에서 발생했다면 드롭다운 메뉴를 false하여 닫음
      if (ref.current && !ref.current.contains(event.target)) {
        onClick(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <BackgroundModal>
      <ModalContainer ref={ref}>
        <ModalTop>
          <ModalHeader>
            <img
              src="/icons/Messages.svg"
              alt="Message Icon"
              width="28"
              height="28"
            />
            <ModalTitle>질문을 작성하세요</ModalTitle>
          </ModalHeader>
          <CloseButton
            src="/icons/Close.svg"
            alt="Modal Close Icon"
            onClick={onClick}
          />
        </ModalTop>
        <ToQuestionBox>
          To.
          <img src={imageSource} alt="" width="28" height="28" />
          <TextStyle>{userName}</TextStyle>
        </ToQuestionBox>
        <Editor placeholder="질문을 작성해주세요" />
      </ModalContainer>
    </BackgroundModal>
  );
};

export default Modal;