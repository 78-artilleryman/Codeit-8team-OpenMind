import styled, { css } from 'styled-components';

const socialIconSize = css`
  width: 40px;
  height: 40px;
`;

const thumbsIconSize = css`
  width: 16px;
  height: 16px;
`;

export const LinkCopy = styled.div`
  background: url('/icons/Link.svg');
  ${socialIconSize}
`;
export const Facebook = styled.div`
  background: url('/icons/Facebook.svg');
  ${socialIconSize}
`;

export const Kakao = styled.div`
  background: url('/icons/Kakao.svg');
  ${socialIconSize}
`;

export const ThumbsUp = styled.div`
  background: url('/icons/thumbs-up.svg') no-repeat center;
  ${thumbsIconSize};
  filter: ${({ $clicked }) =>
    $clicked
      ? 'invert(33%) sepia(96%) saturate(1804%) hue-rotate(201deg) brightness(95%) contrast(99%)'
      : 'var(--gray40)'};
`;

export const ThumbsDown = styled.div`
  background: url('/icons/thumbs-down.svg') no-repeat center;
  ${thumbsIconSize};
  filter: ${({ $clicked }) =>
    $clicked
      ? 'invert(33%) sepia(96%) saturate(1804%) hue-rotate(201deg) brightness(95%) contrast(99%)'
      : 'var(--gray40)'};
`;

export const Kebab = styled.div`
  background: url('/icons/More.svg') no-repeat center;
  width: 26px;
  height: 26px;
`;

export const Edit = styled.div`
  background: url('/icons/Edit.svg') no-repeat center;
  width: 14px;
  height: 14px;
`;

export const DeleteQuestion = styled.div`
  background: url('/icons/Delete.svg') no-repeat center;
  width: 10px;
  height: 10px;
`;

export const DeleteAnswer = styled.div`
  background: url('/icons/AnswerDelete.svg') no-repeat center;
  width: 14px;
  height: 14px;
`;

export const Rejection = styled.div`
  background: url('/icons/Rejection.svg') no-repeat center;
  width: 12px;
  height: 12px;
`;
