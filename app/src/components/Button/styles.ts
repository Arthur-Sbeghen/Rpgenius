import styled from "styled-components";

export const ButtonDefault = styled.button`
  max-width: 150px;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  background-color: #8a2be2;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #6a1bbf;
  }
`;

export const ButtonSuccess = styled.button`
  max-width: 150px;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  background-color: #34ea1f;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #29903b;
  }
`;
