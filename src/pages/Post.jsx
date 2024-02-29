import React, { useEffect, useState } from 'react';
import PostBanner from 'components/post/PostBanner';
import { useParams } from 'react-router-dom';
import { getSubjectById } from '../api';
import Share from 'components/post/Share';
import Button from 'components/common/Button';
import styled from 'styled-components';

const AddQuestionButton = styled(Button)`
  @media (max-width: 767px) {
    width: 123px;
  }
`;

const Post = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState();
  const [shortButton, setShortButton] = useState(false);

  // 창 크기가 바뀔 때 질문 작성 버튼 문구 변경
  window.onresize = function () {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 767) {
      setShortButton(true);
      return;
    }
    setShortButton(false);
  };

  useEffect(() => {
    getSubjectById(postId).then(setPostData);
  }, [postId]);

  return (
    <div>
      {postData && (
        <>
          <PostBanner
            userProfileImage={postData.imageSource}
            userName={postData.name}
          ></PostBanner>
          <Share />
          <AddQuestionButton
            varient="floating"
            width={208}
            location={{ top: '90%', right: '32px' }}
          >
            {shortButton ? '질문작성' : '질문 작성하기'}
          </AddQuestionButton>
        </>
      )}
    </div>
  );
};

export default Post;
