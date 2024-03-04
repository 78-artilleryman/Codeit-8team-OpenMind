import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;

  width: 336px;
  height: 46px;

  margin: auto;

  @media (max-width: 767px) {
    width: 257px;
    height: 46px;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 25%;
  left: 10px;
`;
const MainInput = styled.input`
  width: 100%;
  height: 100%;

  border-radius: 8px;
  border: 1px solid var(--gray40);
  padding: 12px 16px;
  padding-left: 34px;
  gap: 4px;
  box-sizing: border-box;
`;

const UserInputForm = ({ onChange }) => {
  return (
    <InputContainer>
      <Image src="/icons/Person.svg" />
      <MainInput onChange={onChange} placeholder="이름을 입력하세요" />
    </InputContainer>
  );
};

export default UserInputForm;
