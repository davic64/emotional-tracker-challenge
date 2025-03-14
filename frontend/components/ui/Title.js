import styled from "styled-components";
import React from "react";

const TitleStyle = styled(({ order, ...props }) =>
  React.createElement(`h${order}`, props)
)`
  color: #2c3e50;
  font-weight: bold;
  margin: 0;
`;

export const Title = ({ children, order = 1 }) => {
  return <TitleStyle order={order}>{children}</TitleStyle>;
};
