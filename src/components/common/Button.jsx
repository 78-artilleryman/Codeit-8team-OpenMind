import styled from 'styled-components';

const BasicButton = styled.button`
  // 버튼 기본 스타일
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => ($height ? $height : 46)}px;
  padding: 12px 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  font-size: 16px;
  font-weight: 400;
  white-space: nowrap;

  // 버튼 밝기 조정
  background-color: ${({ $bright }) =>
    $bright ? 'var(--btColor2)' : 'var(--btColor1)'};
  color: ${({ $bright }) =>
    $bright ? 'var(--btFontColor2)' : 'var(--btFontColor1)'};
  border: 1px solid
    ${({ $bright }) => ($bright ? 'var(--btBorderColor)' : 'var(--btColor1)')};

  // 버튼 비활성화 스타일
  opacity: ${({ $inactive }) => ($inactive ? 0.5 : 1)};
  cursor: ${({ $inactive }) => ($inactive ? 'default' : 'pointer')};

  // 버튼 애니메이션
  &:not([disabled]):hover {
    border: 2px solid var(--brown40);
  }

  &:not([disabled]):active {
    border: 2px solid var(--brown50);
    background-color: ${({ $bright }) =>
      $bright ? 'var(--brown20)' : 'var(--brown50)'};
  }
`;

const FloatingButton = styled(BasicButton)`
  box-shadow: 0 4px 4px 0 #00000040;
  border-radius: 200px;
`;

const Button = ({
  children,
  className,
  onClick,
  width,
  height,
  bright,
  inactive = false,
  variant,
}) => {
  if (variant === 'icon') {
    return (
      <button onClick={onClick} className={className} disabled={inactive}>
        {children}
      </button>
    );
  }

  if (variant === 'floating') {
    return (
      <FloatingButton
        onClick={onClick}
        className={className}
        disabled={inactive}
        $width={width}
        $height={height}
        $bright={bright}
        $inactive={inactive}
      >
        {children}
      </FloatingButton>
    );
  }

  return (
    <BasicButton
      onClick={onClick}
      className={className}
      disabled={inactive}
      $width={width}
      $height={height}
      $bright={bright}
      $inactive={inactive}
    >
      {children}
    </BasicButton>
  );
};

export default Button;
