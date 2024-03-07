import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import CardItem from './CardItem';
import PagiNation from './PagiNation';
import { getAllSubject } from 'api';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import useBrowserSize from 'hooks/useBrowserSize';
import Loding from 'components/common/Loding';

const Container = styled.section`
  max-width: 940px;
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(auto-fit, minmax(186px, 1fr));
  gap: 20px;
  margin: 0 auto;

  @media (min-width: 868px) {
    grid-template: repeat(2, 1fr) / repeat(4, minmax(186px, 1fr));
  }
  @media (max-width: 867px) and (min-width: 662px) {
    grid-template: repeat(2, 1fr) / repeat(3, minmax(186px, 1fr));
  }
  @media (max-width: 661px) {
    grid-template: repeat(3, 1fr) / repeat(2, minmax(155.5px, 1fr));
  }
`;

const CardList = () => {
  const [cards, setCards] = useState(null);
  const [limit, setLimit] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const [searchPage] = useSearchParams();
  const [searchSort] = useSearchParams();

  const page = searchPage.get('page');
  const sort = searchSort.get('sort');

  const { windowWidth } = useBrowserSize();

  const fetchData = async (newPage, sort) => {
    setIsLoading(true);
    const offset = (newPage - 1) * limit; // 페이지당 limit개씩
    try {
      const data = await getAllSubject(limit, offset, sort);
      setCards(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = newPage => {
    fetchData(newPage, sort);
  };

  // 페이지 당 보여질 아이템 수를 결정하는 함수
  const handleMaxCard = useCallback(() => {
    if (!windowWidth) return;
    if (windowWidth <= 867) {
      setLimit(6);
    } else {
      setLimit(8);
    }
  }, [windowWidth]);

  useEffect(() => {
    fetchData(page, sort);
  }, [limit, sort]);

  useEffect(() => {
    handleMaxCard();
  }, [handleMaxCard]);

  if (!cards)
    return (
      <>
        <Loding />
      </>
    );

  if (
    location.search !== '' &&
    location.search.split('=').at(-1) !== 'createdAt' &&
    location.search.split('=').at(-1) !== 'name' &&
    location.search.split('=').at(-1) !== 'null'
  )
    return <Navigate to="/src/pages/NotFound" />;

  return (
    <>
      <Container>
        {isLoading ? (
          <Loding />
        ) : (
          cards.results.map(card => <CardItem key={card.id} {...card} />)
        )}
      </Container>
      <PagiNation
        totalItems={cards.count} // 데이터의 총 개수
        itemCountPerPage={limit} // 페이지 당 보여줄 데이터 개수
        pageCount={5} // 보여줄 페이지 개수
        currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1} // 현재 페이지 반환
        onPageChange={handlePageChange} // 페이지 변경 핸들러
        selectPageNumber={page}
        sort={sort}
      />
    </>
  );
};

export default CardList;
