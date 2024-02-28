import styled from 'styled-components';
import Filter from 'components/list/Filter';
import Title from 'components/list/Title';

const StyledTitleFilterArea = styled.div`
  width: 21.3125rem;
  margin: 8.56rem auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

function App() {
  return (
    <StyledTitleFilterArea>
      <Title />
      <Filter />
    </StyledTitleFilterArea>
  );
}

export default App;
