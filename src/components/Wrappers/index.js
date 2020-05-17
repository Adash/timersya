import styled from 'styled-components';

const BaseWrapper = styled.div`
  height: 100vh;
  max-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainWrapper = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const StyledForm = styled.form`
  margin-top: 15px;
  height: 30%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* margin-bottom: 10px; */
`;

export { BaseWrapper, MainWrapper, StyledForm };
