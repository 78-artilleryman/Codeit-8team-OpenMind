import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import CardItem from './CardItem';
import PagiNation from './PagiNation';
import { getAllSubject } from 'api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useBrowserSize from 'hooks/useBrowserSize';

const Container = styled.section`
  max-width: 940px;
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(4, 1fr);
  gap: 20px;
  margin: 0 auto;

  @media (max-width: 767px) {
    grid-template: repeat(2, 1fr) / repeat(3, 1fr);
  }
  @media (max-width: 374px) {
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  }
`;

const CardList = () => {
  const [cards, setCards] = useState(null);
  const [searchParams] = useSearchParams();
  const [limit, setLimit] = useState(8);

  const page = searchParams.get('page');
  const navigator = useNavigate();

  const { windowWidth } = useBrowserSize();

  const fetchData = async newPage => {
    const offset = (newPage - 1) * limit; // 페이지당 limit개씩
    try {
      const data = await getAllSubject(limit, offset, 'time');
      setCards(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = newPage => {
    fetchData(newPage);
  };

  // 페이지 당 보여질 아이템 수를 결정하는 함수
  const handleMaxCard = useCallback(() => {
    if (!windowWidth) return;
    if (windowWidth >= 767) {
      setLimit(8);
    } else {
      setLimit(6);
    }
  }, [windowWidth]);

  useEffect(() => {
    fetchData();
    navigator(`?page=${1}`);
  }, [limit]);

  useEffect(() => {
    handleMaxCard();
  }, [handleMaxCard]);

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
            itemCountPerPage={limit} // 페이지 당 보여줄 데이터 개수
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
