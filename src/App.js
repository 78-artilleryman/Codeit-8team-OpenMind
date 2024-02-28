import styled from 'styled-components';
import Filter from 'components/list/Filter';
import Title from 'components/list/Title';

const StyledTitleFilterArea = styled.div`
  width: 21.3125rem;
  margin: 8.56rem auto 1.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 375px) {
    width: auto;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 12.688rem 1.5rem 1rem 1.5rem;
  }
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
