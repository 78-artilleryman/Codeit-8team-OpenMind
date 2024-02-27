import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PaigeNation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const PageBox = styled(Link)`
  display: flex;
  width: 40px;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Arrow = styled.p`
  color: var(--gray40, #818181);
  text-align: center;
  font-size: 20px;
  font-weight: 400;
`;

const Number = styled(Arrow)``;

function PagiNation({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage); // 총 페이지 개수 //6
  const [start, setStart] = useState(1); // 시작 페이지 //1
  const noPrev = start === 1; // 이전 페이지가 없는 경우
  const noNext = start + pageCount - 1 >= totalPages; // 다음 페이지가 없는 경우

  useEffect(() => {
    if (currentPage === start + pageCount) setStart(prev => prev + pageCount);
    if (currentPage < start) setStart(prev => prev - pageCount);
  }, [currentPage, pageCount, start]);

  const handleClick = page => {
    onPageChange(page);
  };

  const pages = [];
  for (let i = start; i < start + pageCount && i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <PaigeNation>
      <PageBox
        disabled={noPrev}
        onClick={() => handleClick(currentPage - 1)}
        to={`?page=${start - 1}`}
      >
        <Arrow>{'<'}</Arrow>
      </PageBox>
      {[...Array(pageCount)].map((a, i) => (
        <>
          {start + i <= totalPages && (
            <PageBox
              key={i}
              to={`?page=${start + i}`}
              onClick={() => handleClick(start + i)}
            >
              <Number>{start + i}</Number>
            </PageBox>
          )}
        </>
      ))}
      <PageBox
        disabled={noNext}
        onClick={() => handleClick(start + pageCount)}
        to={`?page=${start + pageCount}`}
      >
        <Arrow>{`>`}</Arrow>
      </PageBox>
    </PaigeNation>
  );
}

export default PagiNation;
