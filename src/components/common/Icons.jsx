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
  filter: ${({ clicked }) =>
    clicked
      ? 'invert(33%) sepia(96%) saturate(1804%) hue-rotate(201deg) brightness(95%) contrast(99%)'
      : 'var(--gray40)'};
`;

export const ThumbsDown = styled.div`
  background: url('/icons/thumbs-down.svg') no-repeat center;
  ${thumbsIconSize};
  filter: ${({ clicked }) =>
    clicked
      ? 'invert(33%) sepia(96%) saturate(1804%) hue-rotate(201deg) brightness(95%) contrast(99%)'
      : 'var(--gray40)'};
`;
