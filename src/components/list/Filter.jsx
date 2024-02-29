import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ArrowDown from '../../assets/icons/Arrow-down.svg';
import ArrowUp from '../../assets/icons/Arrow-up.svg';

const StyledSelectBox = styled.div`
  position: relative;
  width: 4.9375rem;
  padding: 0.5rem 0.75rem;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  border-radius: 0.5rem;
  border: 1px solid
    ${props =>
      props.isShow ? 'var(--gray60, #000)' : 'var(--gray40, #818181)'};
  background: var(--Grayscale-10, #fff);
  color: ${props =>
    props.isShow ? 'var(--gray60, #000)' : 'var(--gray40, #818181)'};

  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.125rem;

  cursor: pointer;

  &::before {
    content: '';
    width: 0.875rem;
    height: 0.875rem;
    background-image: url(${props => (props.isShow ? ArrowUp : ArrowDown)});
    background-size: 0.875rem 0.875rem;
    position: absolute;
    right: 0.75rem;
  }
`;

const Label = styled.label`
  margin-right: auto;
  cursor: pointer;
  color: ${props => (props.isShow ? 'var(--gray60, #000)' : 'inherit')};
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;

  display: flex;
  width: 4.9375rem;
  padding: 0.25rem 0rem;
  flex-direction: column;

  bottom: -4.875rem;

  border-radius: 0.5rem;
  border: 1px solid var(--gray30, #cfcfcf);
  background: var(--gray10, #fff);

  box-shadow: 0px 4px 4px 0px rgba(140, 140, 140, 0.25);
`;

const Option = styled.li`
  display: flex;
  padding: 0.375rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;

  color: ${props =>
    props.isSelected ? 'var(--blue, #1877F2)' : 'var(--gray50, #515151)'};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.125rem;
`;

function Filter() {
  // 드롭다운(필터) 옵션, 기본 선택은 최신순(createdAt)
  const [filter, setFilter] = useState('createdAt');
  // 드롭다운 메뉴의 표시, 기본 false 상태로 숨겨져 있음
  const [isShow, setIsShow] = useState(false);
  const ref = useRef(null);

  // 요구사항에는 없지만, 드롭다운 메뉴밖 영역을 선택했을때 드롭다운 메뉴 표시가 꺼지도록 설정
  useEffect(() => {
    function handleClickOutside(event) {
      // ref.current는 참조 객체의 현재 값(외부 클릭을 감지하고자 하는 대상)
      // ref.current가 event.target을 포함하는지 판단하여 !연산
      // 즉, event.target이 외부에서 발생했다면 드롭다운 메뉴를 false하여 닫음
      if (ref.current && !ref.current.contains(event.target)) {
        setIsShow(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // StyledSelectBox를 클릭할때마다, isShow 상태를 토글하여 드롭다운 메뉴 표시 제어
  const toggleSelectOptions = () => setIsShow(!isShow);

  // 드롭다운에서 옵션을 클릭할 때 호출
  // 선택된 옵션의 값으로 filter를 설정하고, 드롭다운 메뉴를 false하여 닫음
  const handleSelect = value => {
    setFilter(value);
    setIsShow(false);
  };

  return (
    <StyledSelectBox isShow={isShow} onClick={toggleSelectOptions} ref={ref}>
      <Label isShow={isShow}>
        {filter === 'createdAt' ? '최신순' : '이름순'}
      </Label>
      {isShow && (
        <SelectOptions>
          <Option
            onClick={() => handleSelect('name')}
            isSelected={filter === 'name'}
          >
            이름순
          </Option>
          <Option
            onClick={() => handleSelect('createdAt')}
            isSelected={filter === 'createdAt'}
          >
            최신순
          </Option>
        </SelectOptions>
      )}
    </StyledSelectBox>
  );
}

export default Filter;
