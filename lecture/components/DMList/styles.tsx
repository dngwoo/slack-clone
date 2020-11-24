import styled from '@emotion/styled';

// collapse 처럼 변수를 줄 수 도 있다.
// eslint-disable-next-line import/prefer-default-export
export const CollapseButton = styled.button<{ collapse: boolean }>`
  background: transparent;
  border: none;
  width: 26px;
  height: 26px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-left: 10px;
  cursor: pointer;
  
  ${({ collapse }) => collapse
    && `
    & i {
      transform: none;
    }
  `};
`;
