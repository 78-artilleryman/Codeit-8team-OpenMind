import { useTheme } from "context/ThemeContext";
import styled from "styled-components";

const StyledLogo = styled.img`
  filter: ${({ theme }) =>
    theme === 'dark'
      ? "invert(100%) sepia(2%) saturate(3102%) hue-rotate(298deg) brightness(91%) contrast(85%)"
      : "none"};
`

const LogoBox = ({ className }) => {
  const {themeMode} = useTheme();

  
  return (
    <>
      <StyledLogo theme={themeMode} src="/icons/logo.svg" alt="Open Mind Logo" className={className} />
    </>
  );
};

export default LogoBox;