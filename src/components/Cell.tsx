import styled from 'styled-components';

const Cell = styled.div<{ alive: boolean }>`
  background-color: ${({ alive }) => (alive ? 'lime' : 'black')};
  border: 1px white solid;
  width: 30px;
  aspect-ratio: 1;
`;

export default Cell;
