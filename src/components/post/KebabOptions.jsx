import styled from 'styled-components';
import Button from 'components/common/Button';
import * as Icons from 'components/common/Icons';

const ToggleList = styled.div`
  display: flex ${({ isClick }) => (isClick ? 'block' : 'none')};
  flex-direction: column;

  position: absolute;
  right: 0;

  text-align: center;

  border: 1px solid var(--gray30);
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px #8c8c8c40;
  background-color: white;

  white-space: nowrap;
`;

const OptionButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 6px 16px;

  font-size: 14px;

  &:hover {
    background-color: var(--gray20);
  }

  &:active {
    color: var(--blue);

    ${Icons.Edit} {
      filter: invert(33%) sepia(96%) saturate(1804%) hue-rotate(201deg)
        brightness(95%) contrast(99%);
    }

    ${Icons.Delete} {
      filter: invert(33%) sepia(96%) saturate(1804%) hue-rotate(201deg)
        brightness(95%) contrast(99%);
    }

    ${Icons.Rejection} {
      filter: invert(33%) sepia(96%) saturate(1804%) hue-rotate(201deg)
        brightness(95%) contrast(99%);
    }
  }
`;

const KebabOptions = ({ isClicked }) => {
  return (
    <ToggleList isClicked={isClicked}>
      <OptionButton varient="icon">
        <Icons.Edit />
        수정하기
      </OptionButton>
      <OptionButton varient="icon">
        <Icons.Delete />
        삭제하기
      </OptionButton>
      <OptionButton varient="icon">
        <Icons.Rejection />
        답변거절
      </OptionButton>
    </ToggleList>
  );
};

export default KebabOptions;
