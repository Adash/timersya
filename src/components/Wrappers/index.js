import styled from 'styled-components';
import { Router } from '@reach/router';

const StyledRouter = styled(Router)`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const MainWrapper = styled.div`
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

// use for fixing reach router 'div bug'
// const FlexWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: stretch;
// `;

const StyledForm = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* margin-bottom: 10px; */
`;

export { StyledRouter, MainWrapper, StyledForm };
