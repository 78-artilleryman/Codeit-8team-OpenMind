import React, { useState } from 'react';
import Button from 'components/common/Button';
import * as Icons from 'components/common/Icons';
import { CopyToClipboard } from 'react-copy-to-clipboard/src';
import { shareFacebook, shareKakao } from 'utils/shareUtils';
import styled from 'styled-components';
import CopiedMessage from 'components/common/CopiedMessage';

const Container = styled.div`
  padding-top: 100px;
  display: flex;
  gap: 12px;
  justify-content: center;
`;
const Share = () => {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const handleShowCopiedMessage = () => {
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 1000);
  };

  return (
    <>
      <Container>
        <CopyToClipboard
          className="CopyLink"
          text={window.location.href}
          onCopy={handleShowCopiedMessage}
        >
          <Button varient="icon">
            <Icons.LinkCopy />
          </Button>
        </CopyToClipboard>
        <Button varient="icon" onClick={shareKakao}>
          <Icons.Kakao />
        </Button>
        <Button varient="icon" onClick={shareFacebook}>
          <Icons.Facebook />
        </Button>
      </Container>

      <CopiedMessage show={showCopiedMessage}>
        클립보드에 복사되었습니다
      </CopiedMessage>
    </>
  );
};

export default Share;
