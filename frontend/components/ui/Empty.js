import styled from "styled-components";

const EmptyState = styled.p`
  color: #7f8c8d;
  text-align: center;
  font-style: italic;
`;

export const Empty = ({ message = "No hay datos" }) => {
  return <EmptyState>{message}</EmptyState>;
};
