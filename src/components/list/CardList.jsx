import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardItem from './CardItem';
import PagiNation from './PagiNation';
import { getAllSubject } from 'api';
import { useSearchParams } from 'react-router-dom';

const Container = styled.section`
  max-width: 940px;
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(4, 1fr);
  gap: 20px;
  margin: 0 auto;
`;

const CardList = () => {
  const [cards, setCards] = useState(null);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const fetchData = async newPage => {
    const offset = (newPage - 1) * 8; // 페이지당 8개씩
    try {
      const data = await getAllSubject(8, offset, 'time');
      setCards(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = newPage => {
    fetchData(newPage);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {cards ? (
        <>
          <Container>
            {cards.results.map(card => (
              <CardItem key={card.id} {...card} />
            ))}
          </Container>
          <PagiNation
            totalItems={cards.count} // 데이터의 총 개수
            itemCountPerPage={8} // 페이지 당 보여줄 데이터 개수
            pageCount={5} // 보여줄 페이지 개수
            currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1} // 현재 페이지 3반환
            onPageChange={handlePageChange} // 페이지 변경 핸들러
          />
        </>
      ) : (
        <div>질문 대상이 없습니다</div>
      )}
    </>
  );
};

export default CardList;
