import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: ${({ width }) => width || "100%"};
  max-width: ${({ maxWidth }) => maxWidth || "100%"};
`;

const Title = styled.h2`
  margin-top: 0;
  color: #2c3e50;
`;

export const CardContainer = ({
  title,
  children,
  width,
  maxWidth,
  ...props
}) => {
  return (
    <Container width={width} maxWidth={maxWidth} {...props}>
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  );
};
