import styled from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  background-color: #1e1e1e;
  border: 1px solid #8e44ff;
  border-radius: 12px;
  overflow: hidden;
  width: 280px;
  display: flex;
  flex-direction: column;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: 2px solid red;
  border-radius: 50%;
  padding: 4px;
  z-index: 1;
  cursor: pointer;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #111;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  color: #c678ff;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

export const System = styled.p`
  color: #ccc;
  margin: 2px 0;
  font-size: 0.9rem;
`;

export const Creator = styled.p`
  color: #888;
  font-size: 0.8rem;
`;
