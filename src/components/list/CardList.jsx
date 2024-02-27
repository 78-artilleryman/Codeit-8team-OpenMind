import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  width: 1200px;
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(2, 1fr);
  gap: 20px;
`;

function CardList() {
  const [cards, setCards] = useState(null);

  return <div>CardList</div>;
}

export default CardList;
