import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Item = styled.li`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s;

  &:hover {
    background-color: #f9f9f9;
  }
`;