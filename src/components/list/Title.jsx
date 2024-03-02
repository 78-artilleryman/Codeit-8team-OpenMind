import styled from 'styled-components';

const StyledTitle = styled.span`
  color: var(--gray60, #000);
  text-align: center;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-size: 2.5rem;

  @media (max-width: 661px) {
    font-size: 1.5rem;
    line-height: 1.875rem;
    word-break: keep-all;
  }
`;

function Title() {
  return <StyledTitle>누구에게 질문할까요?</StyledTitle>;
}

export default Title;
